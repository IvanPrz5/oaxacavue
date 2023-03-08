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
  display: flex;
  width: 500px;
  margin: 150px auto;
  background-color: rgb(194, 196, 199);
}
</style>