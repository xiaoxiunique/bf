<template>
  <DSDialog title="UploadProxies" v-bind="$attrs">
    <div class="row justify-between">
      <q-input model-value="" style="width: 45%; display: inline-block" label="picLink" v-model="form.picLink"></q-input>
      <q-input model-value="" style="width: 45%; display: inline-block" label="name" v-model="form.name"></q-input>
      <q-select model-value="" style="width: 45%; display: inline-block" label="type" :options="['http']" v-model="form.type">
      </q-select>
      <q-input model-value="" style="width: 45%; display: inline-block" label="cronExpr" v-model="form.cronExpr"></q-input>
      <q-input model-value="" style="width: 45%; display: inline-block" label="data" v-model="form.curlText"></q-input>
    </div>
  </DSDialog>
</template>

<script>
import DSDialog from "components/DSDialog";
import {ref, watch} from "vue";

export default {
  components: {DSDialog},
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
