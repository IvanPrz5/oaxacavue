<template>
  <v-container class="container">
    <v-data-table :headers="headers" :items="desserts" :search="search" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="title">Timbrados</v-toolbar-title>
          <v-divider class="mx-6" inset vertical></v-divider>
          <template>
            <v-dialog v-model="dialog" max-width="750px">
              <template v-slot:activator="{ on, attrs }">
                <v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                  offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="search" label="Buscar" prepend-icon="mdi-calendar" readonly v-bind="attrs"
                      v-on="on" hide-details></v-text-field>
                  </template>
                  <v-date-picker v-model="search" @input="menu1 = false" no-title scrollable></v-date-picker>
                </v-menu>
              </template>
              <FormTimbrado @closeCompTim="close" />
            </v-dialog>
          </template>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn class="mr-3" elevation="1" color="orange" fab dark tile x-small @click="agregarResultado(item.id)">
          <v-icon small> mdi-bell </v-icon>
        </v-btn>
        <v-btn class="mr-3" elevation="1" color="primary" fab dark tile x-small @click="editItem(item)">
          <v-icon small> mdi-pencil </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogResultado" max-width="700px">
      <FormResultado :idTimbrado="idTimbrado" @closeCompRes="close" />
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import FormResultado from "./FormResultado.vue";
import FormTimbrado from "./FormTimbrado.vue";

export default {
  name: "Timbrado",
  components: {
    FormResultado,
    FormTimbrado
  },
  data: () => ({
    concepto: "",
    dialog: false,
    dialogResultado: false,
    search: "",
    idTimbrado: "",
    numberRules: [
      (value) => value > 0 || "campo requerido",
      (value) => value > 0 || "El valor debe ser mayor a cero",
      (v) => !!v || "Name is required",
    ],
    result: [],
    menu: false,
    menu1: false,
    menu2: false,
    dates: [],
    dateFechaPago: "",
    dateFechaSubida: "",
    dateFechaCaptura: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    desserts: [],
    headers: [
      { text: "ID", align: "start", value: "id" },
      { text: "Archivo", value: "archivo" },
      { text: "Archivo Timbrar", value: "archivoTimbrar" },
      { text: "Empleados", value: "totalEmpleados" },
      { text: "Fecha de Inicio", value: "fechaInicio" },
      { text: "Fecha Fin", value: "fechaFin" },
      { text: "Fecha Pago", value: "fechaPago" },
      { text: "SNFC", value: "descripcionSNFC" },
      { text: "ISR", value: "importeIsr" },
      { text: "Estado", value: "descripcionStatus" },
      { text: "Fecha Subida", value: "fechaSubida" },
      { text: "Neto", value: "neto" },
      { text: "Num. de Ejecuciones", value: "numEjecuciones" },
      { text: "Observaciones", value: "observaciones" },
      { text: "Documento Contable", value: "documentoContable" },
      { text: "Numero", value: "numero" },
      { text: "Nomina", value: "nomina" },
      { text: "Opciones", value: "actions" },
    ],
    editedItem: [
      {
        id:"",
        archivo: "",
        archivoTimbrar: "",
        totalEmpleados: "",
        descripcionSNFC: "",
        descripcionStatus: "",
        importeIsr: "",
        neto: "",
        documentoContable: "",
        numero: "",
        numEjecuciones: "",
        nomina: "",
        idCapitalH: "",
        observaciones: "",
      },
    ],
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
  },
  methods: {
    agregarResultado(id) {
      this.dialogResultado = true;
      this.idTimbrado = id;
      console.log(this.idTimbrado)
    },
    getMapping() {
      this.desserts.length = "";
      axios.get("http://localhost:8082/Timbrado").then((response) => {
        this.result = response.data.data;
        // console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          this.desserts.push({
            id: response.data[i].id,
            archivo: response.data[i].archivo,
            archivoTimbrar: response.data[i].archivoTimbrar,
            totalEmpleados: response.data[i].totalEmpleados,
            fechaInicio: response.data[i].fechaInicio,
            fechaFin: response.data[i].fechaFin,
            fechaPago: response.data[i].fechaPago,
            descripcionSNFC:
              response.data[i].catalogoSNFCEntity.descripcion,
            importeIsr: response.data[i].importeIsr,
            descripcionStatus:
              response.data[i].catalogoStatusEntity.descripcion,
            fechaSubida: response.data[i].fechaSubida,
            neto: response.data[i].neto,
            numEjecuciones: response.data[i].numEjecuciones,
            observaciones: response.data[i].observaciones,
            documentoContable: response.data[i].documentoContable,
            numero: response.data[i].numero,
            nomina: response.data[i].nomina,
          });
        }
      });
    },
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
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.dialogResultado = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>
