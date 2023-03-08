<template>
  <v-container class="container-login">
    <v-form class="form" ref="form" lazy-validation>
      <v-text-field v-model="email" required outlined label="Email" prepend-inner-icon="mdi-email"></v-text-field>
      <v-text-field v-model="password" required outlined label="Contraseña" prepend-inner-icon="mdi-lock"></v-text-field>
      <v-btn block @click="obtenerToken" color="success">Entrar</v-btn>
    </v-form>
  </v-container>
  <!-- <v-container class="container">
    <form>
      <v-text-field label="Correo" v-model="email" required dense outlined></v-text-field>
      <v-text-field label="Contraseña" v-model="password" required dense outlined></v-text-field>
      <v-btn @click="obtenerToken" color="success">Entrar</v-btn>
    </form>
  </v-container> -->
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    error: false,
  }),
  methods: {
    obtenerToken() {
      const ENDPOINT_PATH = "http://localhost:8082/login";

      let userCred = {
        email: this.email,
        password: this.password,
      };
      axios.post(ENDPOINT_PATH, userCred, {}).then((response) => {
        const headers = response.headers;
        const bToken = headers.get("Authorization");
        const token = bToken.replace("Bearer ", "");
        localStorage.setItem("token", token);
        this.$router.push("/CapitalHumano");
        console.log(response);
      });
    },
    login() { },
  },
};
</script>

<style>
.container-login {
  width: 500px;
  height: 500px;
}
</style>
