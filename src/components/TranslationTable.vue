<script setup>
import { ref, computed, defineProps, defineEmits, reactive } from 'vue';

const props = defineProps({
  translations: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['save']);
const filterTerm = ref();
const internalObj = reactive({ ...props.translations });

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
  <div class="container">
    <div class="float-right mt-3 col-3">
      <input class="form-control" type="text" placeholder="filter by key" name="filter"
        v-model="filterTerm">
    </div>
    <p class="mb-1 text-muted text-end">Last modified by John Doe on Dec 21, 2022</p>
    <ul class="list-group mb-4">
      <li class="list-group-item"
        :class="{ 'border-warning': internalObj[key] !== translations[key] }"
        v-for="key in filteredTranslationsKeys" :key="key">
        <label :for="key" class="form-label label">{{ key }}</label>
        <textarea rows="1" class="text-area form-control" :id="key" :name="key"
          v-model="internalObj[key]" />
        <span class="d-block mt-2 text-muted" v-if="internalObj[key] !== translations[key]">
          Unsaved translation. Old value: {{ translations[key] }}
        </span>
      </li>
    </ul>
    <button @click="save" class="btn btn-success" type="button">Save</button>
  </div>
</template>

<style scoped>
.label {
  font-weight: 700;
}

.text-area {
  resize: none;
}
</style>
