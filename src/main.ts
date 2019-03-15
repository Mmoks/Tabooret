import Vue from "vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import VueInputAutowidth from "vue-input-autowidth";
import VueRx from "vue-rx";

// import devtools from './../node_modules/@vue/devtools'

import App from "./App.vue";
import router from "./router";
import store from "@/store/store";

Vue.use(VueMaterial);
Vue.use(VueInputAutowidth);
Vue.use(VueRx);

Vue.config.productionTip = true;
Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
