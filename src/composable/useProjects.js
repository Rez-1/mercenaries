import {
  ref,
} from 'vue';
import axios from "axios";

export default function useProjects() {
  const projects = ref([]);
  const isLoading = ref(false);

  const fetch = () => {
    isLoading.value = true;
    axios.get(
      "http://localhost:4000/api/application",
    )
      .then((res) => {
        projects.value = res.data.applicationList;
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  fetch();
  return {
    isLoading,
    projects,
  };
}
  