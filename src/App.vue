<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <Header :loading="showSpinner"></Header>
        <div id="form">
          <div class="form_row row mt-2">
            <div class="col-4">
              <label for="application" class="text-right align-middle">Select Application</label>
            </div>
            <div class="col-8">
              <select name="application" id="application" class="form-select"
                v-model="selectedProject">
                <option
                  v-for="projectName in projects"
                  :key="projectName"
                  :value="projectName">
                  {{ projectName }}
                </option>
              </select>
            </div>
          </div>
          <div class="form_row row mt-2">
            <div class="col-4">
              <label for="language" class="text-right align-middle">Select Language</label>
            </div>
            <div class="col-8">
              <select name="language" id="language" class="form-select" v-model="selectedLanguage">
                <option
                  v-for="lang in locales"
                  :key="lang"
                  :value="lang">
                  {{ lang }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <TranslationTable @save="saveTranslations" v-if="Object.keys(translations).length"
          :translations="translations" />
      </div>
      <div class="col">
        <Figma :application="selectedProject"></Figma>
      </div>
    </div>
  </div>
</template>

<script setup>
import TranslationTable from './components/TranslationTable.vue';
import Header from './components/Header.vue';
import Figma from './components/Figma.vue';
import useProjects from '@/composable/useProjects';
import useLocales from '@/composable/useLocales';
import useTranslations from '@/composable/useTranslations';
import { computed, ref } from 'vue';

const selectedProject = ref('address-book');
const selectedLanguage = ref('en');

const { projects, isLoading: loadingProjects } = useProjects();
const { locales, isLoading: loadingLocales } = useLocales(selectedProject);
const { translations, setTranslations, isLoading: loadingTranslations } = useTranslations(selectedProject, selectedLanguage);

const showSpinner = computed(() => (
  loadingLocales.value || loadingProjects.value|| loadingTranslations.value
));

function saveTranslations(items) {
  setTranslations(items);
}

</script>
<style scoped>
@import'~bootstrap/dist/css/bootstrap.css';

label {
  font-weight: bold;
}
</style>
