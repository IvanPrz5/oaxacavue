<template>
  <v-app>
    <v-main>
      <CapitalH />
      <Timbrado />
      <!-- <Finalizado /> -->
    </v-main>
  </v-app>
</template>

<script>
import CapitalH from "./components/CapitalH.vue";
import Timbrado from "./components/Timbrado.vue";
import Finalizado from "./components/Finalizado.vue";

export default {
  name: "App",
  components: {
    CapitalH,
    Timbrado,
    Finalizado,
  },
  data: () => ({
    //
  }),
};
</script>
