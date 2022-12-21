<script setup>
import { defineProps } from 'vue';
const urls = {
  'address-book': 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FThd7a8QfFW7eIr1GggrhVO%2FIB-Rebuild-Address-book%3Fnode-id%3D2%253A3444%26t%3DDTin2TyVMO6quRxT-1',
  'mutation-overview': 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fx3YX0WARE3ExCoftkw3btf%2FIB-Rebuild%3Fnode-id%3D14527%253A152372%26t%3DMILcbNoYpJUTY8IX-1'
};
defineProps(['application']);
</script>

<style scoped="true">
.wrapper {
  height: 80vh;
  padding: 1em;
}
</style>

<template>
  <div class="wrapper">
    <iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="100%" :src="urls[application]" allowfullscreen></iframe>
  </div>
</template>
