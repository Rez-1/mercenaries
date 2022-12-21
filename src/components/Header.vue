<script setup>
import { defineProps } from 'vue';
defineProps(['loading', 'name']);
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
    <div class="name"><h1 class="display-1">{{name }}</h1></div>
    <div class="loading">
      <div class="spinner-border text-primary" role="status" v-if="loading">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </header>
</template>
