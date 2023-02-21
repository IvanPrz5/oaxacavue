<template>
  <v-btn color="blue darken-1" text @click="putData">{{ text }}</v-btn>
</template>

<script>
export default {
  name: "Button",
  components: {
    // Calendario,
  },
  props: {
    idCapitalH: "",
    text: "",
  },
  data: () => ({}),
  methods:{
    putData(){
      console.log("Hasdasd");
      this.$emit("click")
    }
  },
};
</script>
