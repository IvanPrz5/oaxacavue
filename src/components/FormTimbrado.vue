<template>
  <v-card v-model="dialog2">
    <v-card-title>
      <span class="text-h5">Agregar Timbrado</span>
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
              <v-text-field label="Total de Empleados" v-model="editedItem.totalEmpleados" required dense
                outlined></v-text-field>
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
              <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="dateFechaPago" label="Fecha De Pago" prepend-icon="mdi-calendar" readonly
                    required v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="dateFechaPago" @input="menu = false" no-title scrollable></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field label="SNFC" v-model="editedItem.descripcionSNFC" dense required outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field label="Estatus Timbrado" v-model="editedItem.descripcionStatus" dense required
                outlined></v-text-field>
            </v-col>
            <v-col>
              <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="dateFechaSubida" label="Fecha De Subida" prepend-icon="mdi-calendar" readonly
                    required v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="dateFechaSubida" @input="menu2 = false" no-title scrollable></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field label="Importe Isr" v-model="editedItem.importeIsr" dense required outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field label="Neto" v-model="editedItem.neto" dense required outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field label="Documento Contable" v-model="editedItem.documentoContable" dense required
                outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field label="Número" v-model="editedItem.numero" dense required outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field label="Número de Ejecuciones" v-model="editedItem.numEjecuciones" dense required
                outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field label="Nómina" v-model="editedItem.nomina" dense required outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field label="Id Capital" v-model="editedItem.idCapitalH" dense required outlined></v-text-field>
            </v-col>
            {{idCapitalH}}
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
      <v-btn color="error darken-1" text @click="close"> Cancelar </v-btn>
      <v-btn color="blue darken-1" text @click="saveData"> Guardar </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "CapitalH",
  components: {
    // Calendario,
  },
  props:
    { idCapitalH : String }
  ,
  data: () => ({
    concepto: "",
    dialog2: false,
    search: "",
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
  }),

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
        return (this.editedItem.pagar = this.editedItem.pagar.toFixed(2));
      }
    },
  },
  methods: {
    agregarFinalizado(id) {
      console.log(id);
      this.dialog = true;
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
            catalogoSNFCEntity: { idSNFC: this.editedItem.descripcionSNFC },
            catalogoStatusEntity: {
              idStatus: this.editedItem.descripcionStatus,
            },
            fechaSubida: this.dateFechaSubida,
            importeIsr: this.editedItem.importeIsr,
            neto: this.editedItem.neto,
            documentoContable: this.editedItem.documentoContable,
            numero: this.editedItem.numero,
            numEjecuciones: this.editedItem.numEjecuciones,
            nomina: this.editedItem.nomina,
            capitalHEntity: { id: this.editedItem.idCapitalH },
            observaciones: this.editedItem.observaciones,
          })
          .then((response) => {
            //this.getMapping();
            //this.close();
            this.$emit("cerrar");
            //console.log(response.data);
          });
      }
    },
    close() {
      console.log("asdasd")
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>
