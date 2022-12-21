import {
  ref,
} from 'vue';
import axios from "axios";

export default function useFormJSON() {
  const isLoading = ref();
  const jsonData = ref();
  const error = ref();
  const fetch = () => {
    isLoading.value = true;
    axios.get(
      "https://jsonplaceholder.typicode.com/posts",
    )
      .then((res) => {
        jsonData = res;
      })
      .catch((err) => {
        error.value = err;
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  fetch();
  return {
    isLoading,
    jsonData,
    error,
  };
}
