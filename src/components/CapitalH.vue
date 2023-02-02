<template>
  <v-container>
    <div>
      <v-form>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field label="Concepto" v-model="editedItem.concepto" dense outlined></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field label="Fondo" v-model="editedItem.fondo" dense outlined></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field label="Num. De Oficio" v-model="editedItem.numeroOficio" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field label="Fecha Inicio" v-model="editedItem.fechaInicio" dense outlined></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field label="Fecha Fin" v-model="editedItem.fechaFin" dense outlined></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field label="Fecha de Pago" v-model="editedItem.fechaPago" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field label="Retención Isr" v-model="editedItem.retencionIsr" dense outlined></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field label="Ajuste Isr" v-model="editedItem.ajusteIsr" dense outlined></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field label="Subsidio + Ajuste de Subsidio" v-model="editedItem.subsidio" dense
              outlined></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field label="A Pagar" v-model="editedItem.pagar" disabled dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-text-field label="Fecha De Captura" v-model="editedItem.fechaCaptura" dense outlined></v-text-field>
        <v-btn color="success" @click="saveData">Ingresar</v-btn>
      </v-form>
    </div>
    <!-- <div>
      <v-data-table :headers="headers" :items="desserts" :search="search" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat>
            <v-dialog>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field class="algo" v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details>
                </v-text-field>
              </template>
            </v-dialog>
          </v-toolbar>
        </template>
      </v-data-table>
    </div> -->
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "CapitalH",
  components: {},
  data: () => ({
    search: "",
    headers: [
      { text: "Concepto", align: "start", value: "concepto" },
      { text: "Fondo", align: "start", value: "fondo" },
      { text: "Número De Oficio", align: "start", value: "numeroOficio" },
      { text: "Inicio", align: "start", value: "fechaInicio" },
      { text: "Fin", align: "start", value: "fechaFin" },
      { text: "Fecha de Pago", align: "start", value: "fechaPago" },
      { text: "Retencion Isr", align: "start", value: "retencionIsr" },
      { text: "Ajuste Isr", align: "start", value: "ajusteIsr" },
      { text: "Subsidio + Ajuste", align: "start", value: "subsidioAjuste" },
      { text: "A Pagar", align: "start", value: "pagar" },
      { text: "Fecha Captura", align: "start", value: "fechaCaptura" },
    ],
    desserts: [],
    editedItem: [
      {
        concepto: "",
        fondo: "",
        numeroOficio: "",
        fechaInicio: "",
        fechaFin: "",
        fechaPago: "",
        retencionIsr: "",
        ajusteIsr: "",
        subsidio: "",
        pagar: "",
        fechaCaptura: "",
      },
    ],
    result: [],
  }),
  created() {
    this.getMapping();
  },
  methods: {
    getMapping() {
      axios.get("http://localhost:8082/CapitalHumano").then((response) => {
        this.result = response.data.data;
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          this.desserts.push({
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
          });
        }
      });
    },
    saveData: function () {
      axios
        .post("http://localhost:8082/CapitalHumano", {
          concepto: this.editedItem.concepto,
          fondo: this.editedItem.fondo,
          numeroOficio: this.editedItem.numeroOficio,
          fechaInicio: this.editedItem.fechaInicio,
          fechaFin: this.editedItem.fechaFin,
          fechaPago: this.editedItem.fechaPago,
          retencionIsr: this.editedItem.retencionIsr,
          ajusteIsr: this.editedItem.ajusteIsr,
          subsidioAjuste: this.editedItem.subsidio,
          pagar: this.editedItem.pagar,
          fechaCaptura: this.editedItem.fechaCaptura,
        })
        .then((response) => {
          this.result = response.data.data;
          console.log(response.data);
        });
    },
  },
};
</script>

<style>
</style>
