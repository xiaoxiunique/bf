
export default {
  namespaced: true,
  state: {
    status: false,
    name: ""
  },

  mutations: {
    open: state => {
      state.status = true
    },
    close: state => {
      state.status = false
    },
    toggle: state => {
      state.status = !state.status
    }
  },

  actions: {
    startTasks(state, ids) { },
    endTasks(state, ids) { },
  }
}
