<template>
  <v-container class="container">
    <v-simple-table :search="search" class="elevation-1">
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
                    <v-text-field v-model="search" label="Fecha De Pago" prepend-icon="mdi-calendar" readonly
                      v-bind="attrs" v-on="on" hide-details></v-text-field>
                  </template>
                  <v-date-picker v-model="search" @input="menu1 = false" no-title scrollable></v-date-picker>
                </v-menu>
              </template>
            </v-dialog>
          </template>
        </v-toolbar>
      </template>
      <thead>
        <tr>
          <th class="text-left">Archivo</th>
          <th class="text-left">Archivo Timbrado</th>
          <th class="text-left">Empleados</th>
          <th class="text-left">Fecha Inicio</th>
          <th class="text-left">Fecha Fin</th>
          <th class="text-left">Fecha Pago</th>
          <th class="text-left">SNFC</th>
          <th class="text-left">Estatus Timbrado</th>
          <th class="text-left">Fecha de Subida</th>
          <th class="text-left">Importe Isr</th>
          <th class="text-left">Neto</th>
          <th class="text-left">Documento Contable</th>
          <th class="text-left">Número</th>
          <th class="text-left">Número de Ejecuciones</th>
          <th class="text-left">Nómina</th>
          <th class="text-left">Observaciones</th>
          <th class="text-left">Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.idTimbrado">
          <td v-show="false">{{ item.id }}</td>
          <td v-show="false">{{ item.idTimbrado }}</td>
          <td>{{ item.archivo }}</td>
          <td>{{ item.archivoTimbrar }}</td>
          <td>{{ item.totalEmpleados }}</td>
          <td>{{ item.fechaInicio }}</td>
          <td>{{ item.fechaFin }}</td>
          <td>{{ item.fechaPago }}</td>
          <td>{{ item.descripcionSNFC }}</td>
          <td>{{ item.descripcionStatus }}</td>
          <td>{{ item.fechaSubida }}</td>
          <td>{{ item.importeIsr }}</td>
          <td>{{ item.neto }}</td>
          <td>{{ item.documentoContable }}</td>
          <td>{{ item.numero }}</td>
          <td>{{ item.numEjecuciones }}</td>
          <td>{{ item.nomina }}</td>
          <td>{{ item.observaciones }}</td>
          <td>
            <v-btn class="mr-3" elevation="1" color="indigo" fab dark tile x-small @click="agregarFinalizado(item.idTimbrado)">
              <v-icon small> mdi-plus </v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "CapitalH",
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
    agregarFinalizado(id) {
      console.log(id);
      this.dialog = true
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
      axios.get("http://localhost:8082/Timbrado").then((response) => {
        this.result = response.data.data;
        // console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          this.desserts.push({
            id: response.data[i].capitalHEntity.id,
            idTimbrado: response.data[i].idTimbrado,
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
            catalogoSNFCEntity: { "idSNFC": this.editedItem.descripcionSNFC },
            catalogoStatusEntity: { "idStatus": this.editedItem.descripcionStatus },
            fechaSubida: this.dateFechaSubida,
            importeIsr: this.editedItem.importeIsr,
            neto: this.editedItem.neto,
            documentoContable: this.editedItem.documentoContable,
            numero: this.editedItem.numero,
            numEjecuciones: this.editedItem.numEjecuciones,
            nomina: this.editedItem.nomina,
            capitalHEntity: { "id": this.editedItem.idCapitalH },
            observaciones: this.editedItem.observaciones,
          })
          .then((response) => {
            this.getMapping();
            this.close();
            //console.log(response.data);
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
