<template>
  <v-container class="home">
    <Login />
  </v-container>
</template>

<script>
import Login from '../components/Login.vue'

export default {
  name: 'HomeView',
  components: {
    Login
  }
}
</script>
<style>
.home{
  border-radius: 10px;
  display: flex;
  width: 500px;
  margin: 150px auto;
  background-color: rgb(235, 238, 243);
}
</style>