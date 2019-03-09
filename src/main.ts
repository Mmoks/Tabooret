import Vue from "vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import VueInputAutowidth from "vue-input-autowidth";
import VueRx from "vue-rx";

// import devtools from './../node_modules/@vue/devtools'

import App from "./App.vue";
import router from "./router";
import store from "@/store/store";
import {
  FETCH_TABSETS_DATA,
  SET_SHOW_PROPERTY,
  SORT_BY_STAR,
  UPLOAD_NEW_TABSET
} from "@/store/actions.type";

Vue.use(VueMaterial);
Vue.use(VueInputAutowidth);
Vue.use(VueRx);

Vue.config.productionTip = true;
Vue.config.devtools = true;

const DB_NAME = "tabsetsData";

new Vue({
  router,
  store,
  mounted() {
    store.dispatch(UPLOAD_NEW_TABSET, DB_NAME).then(async () => {
      await store.dispatch(FETCH_TABSETS_DATA, DB_NAME);
      await store.dispatch(SET_SHOW_PROPERTY);
      await store.dispatch(SORT_BY_STAR);
    });
  },
  render: h => h(App)
}).$mount("#app");
