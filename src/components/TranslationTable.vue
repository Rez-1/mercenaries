<script setup>
import { ref, computed, defineProps, defineEmits, reactive } from 'vue';

import mockJSON from '../mock.json';

const props = defineProps({
  translations: {
    type: Object,
    default: () => mockJSON,
  },
});

const emits = defineEmits(['save']);
const filterTerm = ref();
const internalObj = reactive({...props.translations});

const filteredTranslationsKeys = computed(() => {
  const allKeys = Object.keys(internalObj);
  if (!filterTerm.value) {
    return allKeys;
  }

  const filteredResults = [];

  allKeys.forEach((key) => {
    if (key.toLowerCase().includes(filterTerm.value.toLowerCase())) {
      filteredResults.push(key);
    }
  });
  
  return filteredResults
});

function save() {
  emits('save', internalObj);
}
</script>

<template>
  <input type="text" placeholder="filter by key" name="filter" v-model="filterTerm">
  <ul>
    <li v-for="key in filteredTranslationsKeys" :key="key">
      {{ key }} <input type="text" :name="key" v-model="internalObj[key]" />
      <span v-if="internalObj[key] !== translations[key]" style="color: orange">
        old value: {{  translations[key] }}
      </span>
    </li>
  </ul>
  <button @click="save">Save</button>
</template>
