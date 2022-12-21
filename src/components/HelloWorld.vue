<script setup>
import {ref} from 'vue';
const keys = ref([]);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<template>

  <table>
    <thead><tr><td>key</td><td>value</td></tr></thead>
    <tr v-for="key in keys"><td></td></tr>
  </table>
</template>
