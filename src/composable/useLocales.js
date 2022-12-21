import {
  ref, watchEffect, unref,
} from 'vue';
import axios from "axios";

export default function useLocales(projectName) {
  const locales = ref([]);
  const isLoading = ref(false);

  const fetch = () => {
    if (!unref(projectName)) {
      return;
    }

    isLoading.value = true;
    axios.get(
      `http://localhost:4000/api/application/${unref(projectName)}`,
    )
      .then((res) => {
        locales.value = res.data.languages;
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  watchEffect(() => fetch());

  return {
    isLoading,
    locales,
  };
}
