<template>
  <q-dialog></q-dialog>
</template>

<script>
import DSDialog from "components/DSDialog";
import VueJsonPretty from 'vue-json-pretty'
import {ref, watch} from "vue";

export default {
  components: {DSDialog, VueJsonPretty},
  props: ["modelData", "mode", "columns"],
  setup(props, {emit}) {
    const model = ref(false);
    const form = ref({});
    watch(props, (v) => {
      form.value = props.modelData;
    });

    return {
      model,
      form,
    };
  },
};
</script>
