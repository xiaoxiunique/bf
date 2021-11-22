import { boot } from 'quasar/wrappers'
import CodeMirrorEditorVue3 from 'codemirror-editor-vue3'
// plugin-style
import "codemirror-editor-vue3/dist/style.css"

export default boot(async ({app}) => {
  app.use(CodeMirrorEditorVue3)
})
