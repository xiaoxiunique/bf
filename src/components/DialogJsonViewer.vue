<template>
  <DSDialog title="UploadProxies" :model-value="false" v-bind="$attrs">
    <div class="row">
      <vue-json-editor v-model="form" :expandedOnStart="true"></vue-json-editor>
      <Editor :data="form"></Editor>
    </div>
  </DSDialog>
</template>

<script>
import DSDialog from "components/DSDialog";
import VueJsonEditor from 'vue-json-editor'
import {ref, watch} from "vue";
import Editor from "components/Editor";

export default {
  components: {Editor, DSDialog, VueJsonEditor},
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
