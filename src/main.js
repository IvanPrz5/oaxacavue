import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import axios from "axios";

Vue.config.productionTip = false;

/* axios.interceptors.response.use((response) => {
  console.log(localStorage)
  console.log(response);
  return response;
}) */

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
