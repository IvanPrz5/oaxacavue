<template>
  <v-container class="container">
    <v-data-table :headers="headers" :items="desserts" :expanded.sync="expanded" show-expand :search="search"
      class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="title">Capital Humano</v-toolbar-title>
          <v-divider class="mx-6" inset vertical></v-divider>
          <template>
            <v-dialog v-model="dialog" max-width="650px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="success" dark v-bind="attrs" v-on="on">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-divider class="mx-6" inset vertical></v-divider>
                <v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                  offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="search" label="Fecha De Pago" prepend-icon="mdi-calendar" readonly
                      v-bind="attrs" v-on="on" hide-details></v-text-field>
                  </template>
                  <v-date-picker v-model="search" @input="menu1 = false" no-title scrollable></v-date-picker>
                </v-menu>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-form ref="form" lazy-validation>
                      <v-row class="form-calendar">
                        <v-col cols="12" md="4">
                          <v-text-field label="Concepto" v-model="editedItem.concepto" required dense
                            outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field label="Fondo" v-model="editedItem.fondo" required dense outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field label="Num. De Oficio" v-model="editedItem.numeroOficio" required dense
                            outlined></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="calendar-div">
                        <v-col>
                          <v-menu :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field v-model="dateRangeText" label="Fecha De Inicio - Fecha Fin"
                                prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="dates" no-title range></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col>
                          <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field item-text="fechaPago" v-model="dateFechaPago" label="Fecha De Pago"
                                prepend-icon="mdi-calendar" readonly required v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="dateFechaPago" @input="menu = false" no-title
                              scrollable></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-text-field @keypress="onlyNumber" label="Retención Isr" v-model="editedItem.retencionIsr"
                            dense required outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field @keypress="onlyNumber" label="Ajuste Isr" v-model="editedItem.ajusteIsr" dense
                            required outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field @keypress="onlyNumber" label="Subsidio" v-model="editedItem.subsidioAjuste" dense
                            required outlined></v-text-field>
                        </v-col>
                      </v-row>
                      <div>
                        <v-text-field @keypress="onlyNumber" label="A Pagar" v-model="editedItem.pagar" readonly
                          required>{{ calculaPago }}</v-text-field>
                        <!-- <v-switch v-model="status" label="Status"></v-switch> -->
                      </div>
                      <v-row v-show="false" class="main-div">
                        <v-col cols="12" md="4">
                          <v-menu :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y
                            min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field v-model="dateFechaCaptura" label="Fecha De Captura"
                                prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                v-show="false"></v-text-field>
                            </template>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <input type="text" v-show="false" v-model="editedItem.id" />
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error darken-1" text @click="close">
                    Cancelar
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="saveData">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div class="btn-control">
          <v-btn class="mr-3" elevation="1" color="orange" fab dark tile x-small @click="agregarTimbrado(item.id)">
            <v-icon small> mdi-bell </v-icon>
          </v-btn>
          <v-btn class="mr-3" elevation="1" color="primary" fab dark tile x-small @click="editItem(item)">
            <v-icon small> mdi-pencil </v-icon>
          </v-btn>
          <v-btn class="mr-3" elevation="1" color="error" fab dark tile x-small @click="ocultarFila(item.id)">
            <v-icon small> mdi-delete </v-icon>
          </v-btn>
        </div>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <ItemsTimbrado :idCapitalHa="item.id" />
        </td>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogTimbrado" max-width="700px">
      <FormTimbrado :idCapitalH="idCapitalH" @closeCompTim="close" />
    </v-dialog>
  </v-container>
</template>
<!-- :idCapitalH="item.id" -->

<script>
import axios from "axios";
import FormTimbrado from "./FormTimbrado.vue";
import ItemsTimbrado from "./ItemsTimbrado.vue";

export default {
  name: "CapitalH",
  components: {
    FormTimbrado,
    ItemsTimbrado,
  },
  data: () => ({
    dialog: false,
    dialogTimbrado: false,
    search: "",
    expanded: [],
    headers: [
      { text: "ID", align: "start", value: "id" },
      { text: "Concepto", value: "concepto" },
      { text: "Fondo", value: "fondo" },
      { text: "Número de Oficio", value: "numeroOficio" },
      { text: "Fecha de Inicio", value: "fechaInicio" },
      { text: "Fecha Fin", value: "fechaFin" },
      { text: "Fecha Pago", value: "fechaPago" },
      { text: "Retención Isr", value: "retencionIsr" },
      { text: "Ajuste Isr", value: "ajusteIsr" },
      { text: "Subsidio", value: "subsidioAjuste" },
      { text: "A Pagar", value: "pagar" },
      // { text: "Status", value:"status" },      
      { text: "", value: "data-table-expand" },
      { text: "Opciones", value: "actions" },
    ],
    numberRules: [
      (value) => value > 0 || "campo requerido",
      (value) => value > 0 || "El valor debe ser mayor a cero",
      (v) => !!v || "Name is required",
    ],
    idCapitalH: "",
    status: true,
    result: [],
    menu1: false,
    menu: false,
    dates: [],
    dateFechaPago: "",
    dateFechaCaptura: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    desserts: [],
    editedIndex: -1,
    editedItem: [
      {
        id: "",
        concepto: "",
        fondo: "",
        date0: "",
        date1: "",
        numeroOficio: "",
        retencionIsr: "",
        ajusteIsr: "",
        subsidio: "",
        pagar: "",
      },
    ],
  }),
  created() {
    this.getMapping();
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Agregar" : "Editar";
    },
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
        this.editedItem.subsidioAjuste != null
      ) {
        this.editedItem.pagar =
          this.editedItem.retencionIsr -
          this.editedItem.ajusteIsr -
          this.editedItem.subsidioAjuste;
        this.editedItem.pagar = this.editedItem.pagar.toFixed(2);
        return this.editedItem.pagar;
      }
    },
  },
  methods: {
    agregarTimbrado(id) {
      this.dialogTimbrado = true;
      this.idCapitalH = id;
      this.idCapitalHa = id;
      // console.log(this.idCapitalHa)
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
    getMapping() {
      this.desserts.length = "";
      axios.get("http://localhost:8082/CapitalHumano/dataCapital/true").then((response) => {
        this.result = response.data.data;
        // console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          this.desserts.push({
            id: response.data[i].id,
            concepto: response.data[i].concepto,
            fondo: response.data[i].fondo,
            numeroOficio: response.data[i].numeroOficio,
            fechaInicio: response.data[i].fechaInicio,
            fechaFin: response.data[i].fechaFin,
            fechaPago: response.data[i].fechaPago,
            retencionIsr: response.data[i].retencionIsr,
            ajusteIsr: response.data[i].ajusteIsr,
            subsidioAjuste: response.data[i].subsidioAjuste,
            pagar: response.data[i].pagar,
            fechaCaptura: response.data[i].fechaCaptura,
            // status: response.data[i].status
          });
        }
      });
    },
    saveData: function () {
      if (this.editedIndex > -1) {
        axios
          .put("http://localhost:8082/CapitalHumano/" + this.editedItem.id, {
            concepto: this.editedItem.concepto,
            fondo: this.editedItem.fondo,
            numeroOficio: this.editedItem.numeroOficio,
            fechaInicio: this.dates[0],
            fechaFin: this.dates[1],
            fechaPago: this.dateFechaPago,
            retencionIsr: this.editedItem.retencionIsr,
            ajusteIsr: this.editedItem.ajusteIsr,
            subsidioAjuste: this.editedItem.subsidioAjuste,
            pagar: this.editedItem.pagar,
            fechaCaptura: this.dateFechaCaptura,
            status: this.status,
          })
          .then(() => {
            this.getMapping();
            this.close();
          });
      } else {
        axios
          .post("http://localhost:8082/CapitalHumano", {
            concepto: this.editedItem.concepto,
            fondo: this.editedItem.fondo,
            numeroOficio: this.editedItem.numeroOficio,
            fechaInicio: this.dates[0],
            fechaFin: this.dates[1],
            fechaPago: this.dateFechaPago,
            retencionIsr: this.editedItem.retencionIsr,
            ajusteIsr: this.editedItem.ajusteIsr,
            subsidioAjuste: this.editedItem.subsidioAjuste,
            pagar: this.editedItem.pagar,
            fechaCaptura: this.dateFechaCaptura,
            status: this.status,
          })
          .then(() => {
            this.getMapping();
            this.close();
          });
      }
    },
    ocultarFila(id) {
      let statusFalse = false;
      axios
        .put("http://localhost:8082/CapitalHumano/statusCapital/" + id, {
          status: statusFalse,
        })
        .then(() => {
          this.getMapping();
        });
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.dialogTimbrado = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>

<style scoped>
/* @import "../style/CapitalH.css"; */
.btn-control{
  display: flex;
}
</style>
