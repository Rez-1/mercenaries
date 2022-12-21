import {
    ref, watchEffect, unref,
  } from 'vue';
  import axios from "axios";
  
  export default function useTranslations(appName, locale) {
    const translations = ref({});
    const isLoading = ref(false);

    const fetch = () => {

      if(!unref(appName) || !unref(locale)) {
        return;
      }
      translations.value = [];
      isLoading.value = true;
      axios.get(
        `http://localhost:4000/api/application/${unref(appName)}/${unref(locale)}`,
      )
        .then((res) => {
          translations.value = res.data;
          console.log(res.data);
        })
        .finally(() => {
          isLoading.value = false;
        });
    };
  
    watchEffect(() => fetch());

    function setTranslations(list) {
      axios.put(`http://localhost:4000/api/application/${unref(appName)}/${unref(locale)}`, list)
      .then(() => {
        translations.value = {...list};

      })
    }

    return {
      isLoading,
      translations,
      setTranslations,
    };
  }
  