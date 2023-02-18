<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Timbrar</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form ref="form" lazy-validation>
          <v-row class="form-calendar">
            <v-col cols="12" md="4">
              <v-text-field label="Archivo" v-model="editedItem.archivo" required dense outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field label="Archivo Timbrado" v-model="editedItem.archivoTimbrar" required dense
                outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field @keypress="onlyNumber" label="Total de Empleados" v-model="editedItem.totalEmpleados"
                required dense outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row class="calendar-div">
            <v-col>
              <v-menu :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="dateRangeText" label="Fecha De Inicio - Fecha Fin" prepend-icon="mdi-calendar"
                    readonly v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="dates" no-title range></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-menu v-model="menuFPago" :close-on-content-click="false" :nudge-right="40"
                transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="dateFechaPago" label="Fecha De Pago" prepend-icon="mdi-calendar" readonly
                    required v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="dateFechaPago" @input="menuFPago = false" no-title scrollable></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-select label="SNFC" v-model="editedItem.descripcionSNFC" item-text="descripcion" item-value="id" @change="getSNFC" :items="snfc" dense outlined></v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-select label="Estatus Timbrado" v-model="editedItem.descripcionStatus" item-text="descripcion" item-value="id" @change="getStatus" :items="status" dense outlined></v-select>
            </v-col>
            <v-col>
              <v-menu v-model="menuFSubida" :close-on-content-click="false" :nudge-right="40"
                transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="dateFechaSubida" label="Fecha De Subida" prepend-icon="mdi-calendar" readonly
                    required v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="dateFechaSubida" @input="menuFSubida = false" no-title
                  scrollable></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field @keypress="onlyNumber" label="Importe Isr" v-model="editedItem.importeIsr" dense required
                outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field @keypress="onlyNumber" label="Neto" v-model="editedItem.neto" dense required
                outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field label="Documento Contable" v-model="editedItem.documentoContable" dense required
                outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field @keypress="onlyNumber" label="Número" v-model="editedItem.numero" dense required
                outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field @keypress="onlyNumber" label="Número de Ejecuciones" v-model="editedItem.numEjecuciones"
                dense required outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field label="Nómina" v-model="editedItem.nomina" dense required outlined></v-text-field>
            </v-col>
            <v-col v-show="false" cols="12" md="4">
              <v-text-field label="Id Capital" v-model="idCapitalH" dense required outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea label="Observaciones" v-model="editedItem.observaciones" name="input-7-4"
                outlined></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error darken-1" text @click="closeTimbrado">
        Cancelar
      </v-btn>
      <v-btn color="blue darken-1" text @click="saveData"> Guardar </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "FormTimbrado",
  components: {
    // Calendario,
  },
  props: { idCapitalH: "" },
  data: () => ({
    search: "",
    result: {},
    snfc: [],
    status:[],
    dates: [],
    menuFPago: false,
    dateFechaPago: "",
    menuFSubida: false,
    dateFechaSubida: "",
    desserts: [],
    editedIndex: -1,
    editedItem: [
      {
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
    numberRules: [
      (value) => value > 0 || "campo requerido",
      (value) => value > 0 || "El valor debe ser mayor a cero",
      (v) => !!v || "Name is required",
    ],
  }),
  created(){
    this.getSNFC();
    this.getStatus();
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
    agregarFinalizado(id) {
      // console.log(id);
      this.dialog = true;
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    showFecha() {
      this.dateFechaPago = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
    },
    getSNFC(){
      // console.log(this.idCapitalH);
      axios.get("http://localhost:8082/SNFC").then((response) => {
        this.result = response.data
        this.snfc = this.result;
      });
    },
    getStatus(){
      axios.get("http://localhost:8082/Status").then((response) => {
        this.result = response.data
        this.status = this.result;
      });
    },
    saveData: function () {
      if (this.editedItem.archivo != null) {
        axios
          .post("http://localhost:8082/Timbrado", {
            archivo: this.editedItem.archivo,
            archivoTimbrar: this.editedItem.archivoTimbrar,
            totalEmpleados: this.editedItem.totalEmpleados,
            fechaInicio: this.dates[0],
            fechaFin: this.dates[1],
            fechaPago: this.dateFechaPago,
            catalogoSNFCEntity: { id: this.editedItem.descripcionSNFC },
            catalogoStatusEntity: {
              id: this.editedItem.descripcionStatus,
            },
            fechaSubida: this.dateFechaSubida,
            importeIsr: this.editedItem.importeIsr,
            neto: this.editedItem.neto,
            documentoContable: this.editedItem.documentoContable,
            numero: this.editedItem.numero,
            numEjecuciones: this.editedItem.numEjecuciones,
            nomina: this.editedItem.nomina,
            capitalHEntity: { id: this.idCapitalH },
            observaciones: this.editedItem.observaciones,
          })
          .then(() => {
            this.$emit("closeCompTim");
          });
      }
    },
    closeTimbrado() {
      this.$emit("closeCompTim");
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>
