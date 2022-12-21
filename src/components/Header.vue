<script setup>
import { defineProps } from 'vue';
defineProps(['loading']);
</script>

<style scoped="true">
header {
  padding: 2em 1em;
  display: flex;
}
header > div  {
  flex-grow: 1;
  flex-direction: column;
}
.loading {
  text-align: right;
}
</style>

<template>
  <header class="container">
    <div class="logo">logo</div>
    <div class="name"></div>
    <div class="loading">
      <div class="spinner-grow" role="status" v-if="loading">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </header>
</template>
