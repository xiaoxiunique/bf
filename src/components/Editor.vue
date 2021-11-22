<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    placeholder="test placeholder"
    :height="200"
    @change="handleEditChange"
  />
</template>

<script>
// plugin-style
import "codemirror-editor-vue3/dist/style.css";
// language
import "codemirror/mode/javascript/javascript.js";
// theme
import "codemirror/theme/dracula.css"

import {ref, watch} from "vue";
import Codemirror from 'codemirror-editor-vue3'

export default {
  name: 'Editor',
  props: {
    data: Object
  },
  components: {
    Codemirror
  },
  setup(props) {
    const code = ref(JSON.stringify(props.data))

    watch(props, (v) => {
      code.value = v.data
    })

    const handleEditChange = (data) => {
      alert(data)
    }

    return {
      handleEditChange,
      code,
      cmOptions: {
        mode: 'json', // Language mode
        theme: 'dracula', // Theme
        lineNumbers: true, // Show line number
        smartIndent: true, // Smart indent
        indentUnit: 2, // The smart indent unit is 2 spaces in length
        foldGutter: true, // Code folding
        styleActiveLine: true, // Display the style of the selected row
      }
    };
  },
}
</script>
