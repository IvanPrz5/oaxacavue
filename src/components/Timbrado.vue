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
                <!-- <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" hide-details>
                  </v-text-field> -->
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Guardar Registro</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-form ref="form" lazy-validation>
                      <v-row class="form-calendar">
                        <v-col cols="12" md="4">
                          <v-text-field label="Archivo" v-model="editedItem.archivo" required dense
                            outlined></v-text-field>
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
                          <v-menu :close-on-content-click="false" transition="scale-transition" offset-y
                            min-width="auto">
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
                              <v-text-field v-model="dateFechaPago" label="Fecha De Pago" prepend-icon="mdi-calendar"
                                readonly required v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="dateFechaPago" @input="menu = false" no-title
                              scrollable></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-text-field label="SNFC" v-model="editedItem.snfc" dense required outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field label="Estatus Timbrado" v-model="editedItem.status" dense required
                            outlined></v-text-field>
                        </v-col>
                        <v-col>
                          <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field v-model="dateFechaSubida" label="Fecha De Subida"
                                prepend-icon="mdi-calendar" readonly required v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="dateFechaSubida" @input="menu2 = false" no-title
                              scrollable></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-text-field label="Importe Isr" v-model="editedItem.importeIsr" dense required
                            outlined></v-text-field>
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
                          <v-text-field label="Número" v-model="editedItem.numero" dense required
                            outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field label="Número de Ejecuciones" v-model="editedItem.numEjecuciones" dense required
                            outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field label="Nómina" v-model="editedItem.nomina" dense required
                            outlined></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-textarea label="Observaciones" v-model="editedItem.nomina" name="input-7-4" outlined></v-textarea>
                        </v-col>
                      </v-row>
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.idTimbrado">
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
    /* headers: [
      { text: "Archivo", align: "start", value: "concepto" },
      { text: "A", align: "start", value: "fondo" },
      { text: "Número De Oficio", align: "start", value: "numeroOficio" },
      { text: "Inicio", align: "start", value: "fechaInicio" },
      { text: "Fin", align: "start", value: "fechaFin" },
      { text: "Fecha de Pago", align: "start", value: "fechaPago" },
      { text: "Retencion Isr", align: "start", value: "retencionIsr" },
      { text: "Ajuste Isr", align: "start", value: "ajusteIsr" },
      { text: "Subsidio + Ajuste", align: "start", value: "subsidioAjuste" },
      { text: "A Pagar", align: "start", value: "pagar" },
      { text: "Fecha Captura", align: "start", value: "fechaCaptura" },
    ], */
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
      axios.get("http://localhost:8082/Timbrado").then((response) => {
        this.result = response.data.data;
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          this.desserts.push({
            archivo: response.data[i].archivo,
            archivoTimbrar: response.data[i].archivoTimbrar,
            totalEmpleados: response.data[i].totalEmpleados,
            fechaInicio: response.data[i].fechaInicio,
            fechaFin: response.data[i].fechaFin,
            fechaPago: response.data[i].fechaPago,
            descripcionSNFC: response.data[i].catalogoSNFCEntity.descripcion,/*  */
            importeIsr: response.data[i].importeIsr,
            descripcionStatus: response.data[i].catalogoStatusEntity.descripcion,/*  */
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
      /* if (this.editedItem.concepto != null) {
        axios
          .post("http://localhost:8082/Timbrado", {
            concepto: this.editedItem.concepto,
            fondo: this.editedItem.fondo,
            numeroOficio: this.editedItem.numeroOficio,
            fechaInicio: this.dates[0],
            fechaFin: this.dates[1],
            fechaPago: this.dateFechaPago,
            retencionIsr: this.editedItem.retencionIsr,
            ajusteIsr: this.editedItem.ajusteIsr,
            subsidioAjuste: this.editedItem.subsidio,
            pagar: this.editedItem.pagar,
            fechaCaptura: this.dateFechaCaptura,
          })
          .then((response) => {
            this.getMapping();
            this.close();
            console.log(response.data);
          });
      } */
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
