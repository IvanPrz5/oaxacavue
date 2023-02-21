<template>
  <v-app>
    <v-main>
      <CapitalH />
      <!-- <Timbrado /> -->
      <Resultado />
    </v-main>
  </v-app>
</template>

<script>
import CapitalH from "./components/CapitalH.vue";
import Timbrado from "./components/Timbrado.vue";
import Resultado from "./components/Resultado.vue";

export default {
  name: "App",
  components: {
    CapitalH,
    Timbrado,
    Resultado,
  },
  data: () => ({
    //
  }),
};
</script>
