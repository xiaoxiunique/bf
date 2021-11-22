import { store } from 'quasar/wrappers';
import { createStore } from 'vuex';


export default store(function(/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
    },
    strict: process.env.DEBUGGING
  });

  return Store;
});


