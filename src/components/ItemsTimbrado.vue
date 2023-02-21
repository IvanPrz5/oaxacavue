<template>
  <v-container>
    <v-data-table style="background-color: #5DBDB3" :headers="headers" :items="desserts"
      class="elevation-1" hide-default-footer>
      <!-- hide-default-footer -->
      <template v-slot:[`item.actions`]="{ item }">
        <div class="btn-control">
          <v-btn class="mr-3" elevation="1" color="orange" fab dark tile x-small @click="agregarResultado(item.id)">
            <v-icon small> mdi-bell </v-icon>
          </v-btn>
          <v-btn class="mr-3" elevation="1" color="primary" fab dark tile x-small @click="editItem(item.id)">
            <v-icon small> mdi-pencil </v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="700px">
      <FormTimbrado :idTimbradoForm="idTimbradoForm" @closeCompTim="close" />
    </v-dialog>
    <v-dialog v-model="dialogResultado" max-width="700px">
      <FormResultado :idTimbrado="idTimbrado" @closeCompRes="close" />
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';
import FormResultado from './FormResultado.vue';
import FormTimbrado from './FormTimbrado.vue';

export default {
  name: "ItemsTimbrado",
  components: {
    FormTimbrado,
    FormResultado
  },
  props: {
    idCapitalHa: "",
  },
  data: () => ({
    dialog: false,
    result: [],
    desserts: [],
    headers: [
      { text: "ID", align: "start", value: "id" },
      { text: "Archivo", value: "archivo" },
      { text: "Archivo Timbrar", value: "archivoTimbrar" },
      { text: "Empleados", value: "totalEmpleados" },
      { text: "Fecha Inicio", value: "fechaInicio" },
      { text: "Fecha Fin", value: "fechaFin" },
      { text: "Fecha Pago", value: "fechaPago" },
      { text: "SNFC", value: "descripcionSNFC" },
      { text: "ISR", value: "importeIsr" },
      { text: "Estado", value: "descripcionStatus" },
      { text: "Fecha Subida", value: "fechaSubida" },
      { text: "Neto", value: "neto" },
      { text: "Ejecuciones", value: "numEjecuciones" },
      { text: "Observaciones", value: "observaciones" },
      { text: "Documento Contable", value: "documentoContable" },
      { text: "Numero", value: "numero" },
      { text: "Nomina", value: "nomina" },
      { text: "Opciones", value: "actions" },
    ],
    dialogResultado: false,
    idTimbrado: "",
    idTimbradoForm: "",
  }),
  watch: {

  },
  created() {
    this.getMapping();
  },
  methods: {
    agregarResultado(id) {
      this.dialogResultado = true;
      this.idTimbrado = id;
      console.log(this.idTimbrado);
    },
    getMapping() {
      // console.log(this.idCapitalHa);
      axios.get("http://localhost:8082/Timbrado/dataCapital/" + this.idCapitalHa).then((response) => {
        this.result = response.data.data;
        for (let i = 0; i < response.data.length; i++) {
          this.desserts.push({
            // id: response.data[i].capitalHEntity.id,
            id: response.data[i].id,
            archivo: response.data[i].archivo,
            archivoTimbrar: response.data[i].archivoTimbrar,
            totalEmpleados: response.data[i].totalEmpleados,
            fechaInicio: response.data[i].fechaInicio,
            fechaFin: response.data[i].fechaFin,
            fechaPago: response.data[i].fechaPago,
            descripcionSNFC: response.data[i].catalogoSNFCEntity.descripcion,
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
    editItem(id) {
      this.idTimbradoForm = id;
      this.dialog = true;
      console.log(this.idTimbradoForm);
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

<style scoped>
/* @import "../style/CapitalH.css"; */
.btn-control {
  display: flex;
}
</style>
