<template>
  <v-container class="container">
    <v-simple-table :search="search" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="title">Finalizados</v-toolbar-title>
          <v-divider class="mx-6" inset vertical></v-divider>
          <template>
            <v-dialog v-model="dialog" max-width="620px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="success" dark v-bind="attrs" v-on="on">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-divider class="mx-6" inset vertical></v-divider>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" hide-details>
                </v-text-field>
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
                          <v-text-field label="Resultado" v-model="editedItem.resultado" required dense
                            outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field label="Exitosos" v-model="editedItem.exito" required dense
                            outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field label="Fallidos" v-model="editedItem.fallidos" required dense
                            outlined></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-text-field label="Isr Timbrado" v-model="editedItem.isrTimbrado" dense required
                            outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field label="Descarga(URL)" v-model="editedItem.urlDescarga" dense required
                            outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field label="PDF" v-model="editedItem.pdf" dense required outlined></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-text-field label="QR" v-model="editedItem.qr" dense required
                            outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field label="XML" v-model="editedItem.xml" dense required outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field label="ID Timbrado" v-model="idTimbrado" dense required outlined></v-text-field>
                        </v-col>
                      </v-row>
                      <div>
                        <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field v-model="dateFechaFin" label="Fecha Fin" prepend-icon="mdi-calendar"
                                readonly required v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="dateFechaFin" @input="menu = false" no-title
                              scrollable></v-date-picker>
                          </v-menu>
                      </div>
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
          <th class="text-left">Resultado</th>
          <th class="text-left">Exitosos</th>
          <th class="text-left">Fallidos</th>
          <th class="text-left">Isr Timbrado</th>
          <th class="text-left">Descarga(URL)</th>
          <th class="text-left">PDF</th>
          <th class="text-left">QR</th>
          <th class="text-left">XML</th>
          <th class="text-left">Fecha Fin</th>
          <th class="text-left">Observaciones</th>
          <th class="text-left">ID Timbrado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.idFinalizado">
          <td>{{ item.resultado }}</td>
          <td>{{ item.exito }}</td>
          <td>{{ item.fallidos }}</td>
          <td>{{ item.isrTimbrado }}</td>
          <td>{{ item.urlDescarga }}</td>
          <td>{{ item.pdf }}</td>
          <td>{{ item.qr }}</td>
          <td>{{ item.xml }}</td>
          <td>{{ item.fechaFinalizado }}</td>
          <td>{{ item.observaciones }}</td>
          <td>{{ item.idTimbrado }}</td>
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
    dateFechaFin: "",
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
        console.log(response.data);
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
            timbradoEntity: {    "idTimbrado"  : this.idTimbrado }
          })
          .then((response) => {
            this.getMapping();
            this.close();
            console.log(response.data);
            console.log(resultado);
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
