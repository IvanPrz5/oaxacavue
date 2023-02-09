<template>
  <v-container class="container">
    <v-simple-table :search="search" class="elevation-1">
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
                          <v-text-field @keypress="onlyNumber" label="Retención Isr" v-model="editedItem.retencionIsr"
                            dense required outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field @keypress="onlyNumber" label="Ajuste Isr" v-model="editedItem.ajusteIsr" dense
                            required outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field @keypress="onlyNumber" label="Subsidio + Ajuste de Subsidio"
                            v-model="editedItem.subsidio" required dense outlined>{{ calculaPago }}</v-text-field>
                        </v-col>
                      </v-row>
                      <div>
                        <v-text-field @keypress="onlyNumber" label="A Pagar" v-model="editedItem.pagar" readonly
                          required></v-text-field>
                      </div>
                      <v-row v-show="false" class="main-div">
                        <v-col cols="12" md="4">
                          <v-menu :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                            offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field v-model="dateFechaCaptura" label="Fecha De Captura"
                                prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                v-show="false"></v-text-field>
                            </template>
                          </v-menu>
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
          <th class="text-left">ID</th>
          <th class="text-left">Concepto</th>
          <th class="text-left">Fondo</th>
          <th class="text-left">Número de Oficio</th>
          <th class="text-left">Fecha Inicio</th>
          <th class="text-left">Fecha Fin</th>
          <th class="text-left">Fecha Pago</th>
          <th class="text-left">Retención Isr</th>
          <th class="text-left">Ajuste Isr</th>
          <th class="text-left">Subsidio</th>
          <th class="text-left">Total a Pagar</th>
          <th class="text-left">Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.concepto }}</td>
          <td>{{ item.fondo }}</td>
          <td>{{ item.numeroOficio }}</td>
          <td>{{ item.fechaInicio }}</td>
          <td>{{ item.fechaFin }}</td>
          <td>{{ item.fechaPago }}</td>
          <td>{{ item.retencionIsr }}</td>
          <td>{{ item.ajusteIsr }}</td>
          <td>{{ item.subsidioAjuste }}</td>
          <td>{{ item.pagar }}</td>
          <td>
            <v-btn class="mr-3" elevation="1" color="#C4AD2B" fab dark tile x-small @click="agregarTimbrado(item.id)">
              <v-icon small> mdi-bell </v-icon>
            </v-btn>
            <v-dialog v-model="dialog2" max-width="700px">
              <FormTimbrado :idCapitalH="item.id" @cerrar="close" />
            </v-dialog>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
import axios from "axios";
import FormTimbrado from "./FormTimbrado.vue";

export default {
  name: "CapitalH",
  components: {
    FormTimbrado
  },
  data: () => ({
    concepto: "",
    dialog: false,
    dialog2: false,
    search: "",
    numberRules: [
      (value) => value > 0 || "campo requerido",
      (value) => value > 0 || "El valor debe ser mayor a cero",
      (v) => !!v || "Name is required",
    ],
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
    editedItem: [
      {
        id: "",
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
        return (this.editedItem.pagar = this.editedItem.pagar.toFixed(2));
      }
    },
  },
  methods: {
    agregarTimbrado(id) {
      console.log(id);
      this.dialog2 = true;
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
      axios.get("http://localhost:8082/CapitalHumano").then((response) => {
        this.result = response.data.data;
        //console.log(response.data);
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
          });
        }
      });
    },
    saveData: function () {
      if (this.editedItem.concepto != null) {
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
            subsidioAjuste: this.editedItem.subsidio,
            pagar: this.editedItem.pagar,
            fechaCaptura: this.dateFechaCaptura,
          })
          .then((response) => {
            this.getMapping();
            this.close();
          });
      }
    },
    close() {
      console.log("asdsa")
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>

<style scoped>
@import "../style/CapitalH.css";
</style>
