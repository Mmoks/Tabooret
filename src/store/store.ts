import Vue from "vue";
import Vuex from "vuex";

import tabsets from "./tabsets.module";

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  modules: {
    tabsets
  }
});
