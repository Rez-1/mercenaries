<template>
<div id="form" class="container">
    <div class="form_row row mt-2" >
      <div class="col-4">
        <label for="application" class="text-right">Select Application</label>
      </div>
      <div class="col-8">
        <select name="application" id="application" class="form-select" v-model="application">
          <option :value="''">
            Select...
          </option>
          <option
            v-for="application in applications"
            :key="application"
            :value="application.value">
              {{application.name}}
          </option>
        </select>
      </div>
    </div>
    <div class="form_row row mt-2" >
      <div class="col-4">
        <label for="language" class="text-right">Select Language</label>
      </div>
      <div class="col-8">
        <select name="language" id="language" class="form-select" v-model="language">
          <option :value="''">
            Select...
          </option>
          <option
            v-for="lang in languages"
            :key="lang"
            :value="lang.value">
              {{lang.name}}
          </option>
        </select>
      </div>
    </div>
  </div>
  <TranslationTable v-if="application && language"/>
</template>

<script setup>
import TranslationTable from './components/TranslationTable.vue'
import {ref} from 'vue';
const application = ref('ibrs_address_book');
const language = ref('en');
const applications = ref([
  {
    name: 'Address Book',
    value: 'ibrs_address_book',
  },
  {
    name: 'Mutations',
    value: 'ibrs_mutations',
  },
  {
    name: 'Pensions',
    value: 'ibrs_pensions',
  }
]);
const languages = ref([
  {
    name: 'English',
    value: 'en',
  },
  {
    name: 'Dutch',
    value: 'nl',
  }
])
</script>
<style scoped>
@import'~bootstrap/dist/css/bootstrap.css';
label{
  font-weight: bold;
}
</style>
