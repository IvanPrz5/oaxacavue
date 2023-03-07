<template>
  <v-container>
    <form @submit.prevent="login">
      <v-text-field
        label="Correo"
        v-model="email"
        required
        dense
        outlined
      ></v-text-field>
      <v-text-field
        label="Contraseña"
        v-model="password"
        required
        dense
        outlined
      ></v-text-field>
      <v-btn type="submit" color="success">Entrar</v-btn>
      <!-- <input type="submit" value="Login"> -->
    </form>
  </v-container>
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
    login() {
      const ENDPOINT_PATH = "http://localhost:8082/login";
      /* const user = {
        email: this.email,
        password: this.password,
      }; */
      /* console.log(token);
      const config = {
        headers: { 'Authorization': `Bearer ${token}` },
      }; */
      axios
        .post(ENDPOINT_PATH, config, {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.$router.push("/");
          console.log(response.token);
        })
        .catch(() => {
          console.log("Error");
        });
    },
  },
};
</script>
