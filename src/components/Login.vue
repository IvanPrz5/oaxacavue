<template>
  <v-container class="container-login" ref="form" lazy-validation>
    <v-form class="form" ref="formLogin" lazy-validation>
      <v-text-field v-model="email" required outlined label="Email" append-icon="mdi-email"
        :rules="emailRules"></v-text-field>
      <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'"
        name="input-10-1" label="Contraseña" outlined @click:append="show = !show" :rules="passwordRules"></v-text-field>
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
import router from "@/router";
import axios from "axios";

export default {
  name: "Login",
  data: () => ({
    show: false,
    email: "admin423@gmail.com",
    emailRules: [
      v => !!v || 'Este campo es requerido',
      // v => /.+@.+\..+/.test(v) || 'El e-mail no es correcto',
    ],
    password: "adminConstra",
    passwordRules: [
      v => !!v || 'Este campo es requerido',
    ],
    error: false,
  }),
  methods: {
    obtenerToken() {
      const ENDPOINT_PATH = "http://localhost:8082/login";
      let validarForm = this.$refs.formLogin.validate()
      if (validarForm) {
        let userCred = {
          email: this.email,
          password: this.password,
        };
        axios.post(ENDPOINT_PATH, userCred, {}).then((response) => {
          console.log(response)
          const headers = response.headers;
          // console.log("->"+response.headers);
          const bToken = headers.get("Authorization");
          const token = bToken.replace("Bearer ", "");
          localStorage.setItem("token", token);
          router.push("CapitalHumano");
          // console.log(response);
        }).catch((error) => {
          // console.log(error)
        });
      } else {
        console.log("error")
      }
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
