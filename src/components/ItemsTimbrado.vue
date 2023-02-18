<template>
  <v-simple-table style="background-color: #81ACD3">
    <thead style="background-color: #0BB832">
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
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
import axios from 'axios';

export default {
  name: "ItemsTimbrado",
  props:{
    idCapitalHa: "",
  },
  data: () => ({
    desserts: [],
    result: [],
  }),
  watch:{
    
  },
  created(){
    this.getMapping();
  },
  methods: {
    getMapping() {
      console.log(this.idCapitalHa);
      axios.get("http://localhost:8082/Timbrado/dataCapital/" + this.idCapitalHa).then((response) => {
        this.result = response.data.data;
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
  },
};
</script>
