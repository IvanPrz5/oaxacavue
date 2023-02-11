<template>
  <v-container class="container">
    <v-data-table :headers="headers" :items="desserts" :search="search" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="title">Finalizados</v-toolbar-title>
          <v-divider class="mx-6" inset vertical></v-divider>
          <template>
            <v-dialog v-model="dialog" max-width="620px">
              <template v-slot:activator="{ on, attrs }">
                <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                  offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="search" label="Buscar" prepend-icon="mdi-calendar" readonly
                      v-bind="attrs" v-on="on" hide-details></v-text-field>
                  </template>
                  <v-date-picker v-model="search" @input="menu = false" no-title scrollable></v-date-picker>
                </v-menu>
              </template>
            </v-dialog>
          </template>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn class="mr-3" elevation="1" color="orange" fab dark tile x-small @click="">
          <v-icon small> mdi-bell </v-icon>
        </v-btn>
        <v-btn class="mr-3" elevation="1" color="primary" fab dark tile x-small @click="">
          <v-icon small> mdi-pencil </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Resultado",
  components: {
    // Calendario,
  },
  data: () => ({
    concepto: "",
    dialog: false,
    search: "",
    numberRules: [
      (value) => value > 0 || "campo requerido",
      (value) => value > 0 || "El valor debe ser mayor a cero",
      (v) => !!v || "Name is required",
    ],
    result: [],
    menu: false,
    dateFechaFin: "",
    headers:[
      { text: "Resultado", align:"start", value:"resultado" },
      { text: "Exitosos", align:"start", value:"exito" },
      { text: "Fallidos", align:"start", value:"fallidos" },
      { text: "Isr Timbrado", align:"start", value:"isrTimbrado" },
      { text: "Descarga (URL)", align:"start", value:"urlDescarga" },
      { text: "PDF", align:"start", value:"pdf" },
      { text: "QR", align:"start", value:"qr" },
      { text: "XML", align:"start", value:"xml" },
      { text: "Fecha Fin", align:"start", value:"fechaFinalizado" },
      { text: "Observaciones", align:"start", value:"observaciones" },
    ],
    desserts: [],
    editedItem: [
      {
        resultado: "",
        exito: "",
        fallidos: "",
        isrTimbrado: "",
        urlDescarga: "",
        pdf: "",
        qr: "",
        xml: "",
        observaciones: "",
      },
    ],
    idTimbrado:"",
  }),
  created() {
    this.getMapping();
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
    calculaPago: function () {
      if (
        this.editedItem.retencionIsr != null &&
        this.editedItem.ajusteIsr != null &&
        this.editedItem.subsidio != null
      ) {
        this.editedItem.pagar =
          this.editedItem.retencionIsr -
          this.editedItem.ajusteIsr -
          this.editedItem.subsidio;
        // this.editedItem.pagar = this.editedItem.pagar.toLocaleString('en')
        return (this.editedItem.pagar = this.editedItem.pagar.toFixed(2));
      }
    },
  },
  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    showFecha() {
      this.dateFechaPago = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
    },
    getMapping() {
      this.desserts.length = "";
      axios.get("http://localhost:8082/Finalizado").then((response) => {
        this.result = response.data.data;
        // console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          this.desserts.push({
            resultado: response.data[i].resultado,
            exito: response.data[i].exito,
            fallidos: response.data[i].fallidos,
            isrTimbrado: response.data[i].isrTimbrado,
            urlDescarga: response.data[i].urlDescarga,
            pdf: response.data[i].pdf,
            qr: response.data[i].qr,
            xml: response.data[i].xml,
            fechaFinalizado: response.data[i].fechaFinalizado,
            observaciones: response.data[i].observaciones,
            idTimbrado: response.data[i].timbradoEntity.idTimbrado,
          });
        }
      });
    },
    saveData: function () {
      console.log(this.editedItem.idTimbrado)
      if (this.editedItem.resultado != null) {
        axios
          .post("http://localhost:8082/Finalizado", {
            resultado: this.editedItem.resultado,
            exito: this.editedItem.exito,
            fallidos: this.editedItem.fallidos,
            isrTimbrado: this.editedItem.isrTimbrado,
            urlDescarga: this.editedItem.urlDescarga,
            pdf: this.editedItem.pdf,
            qr: this.editedItem.qr,
            xml: this.editedItem.xml,
            fechaFinalizado: this.dateFechaFin,
            observaciones: this.editedItem.observaciones,
            timbradoEntity: { id: this.idTimbrado }
          })
          .then((response) => {
            this.getMapping();
            this.close();
            // console.log(response.data);
          });
      }
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>
