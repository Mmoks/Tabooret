import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import devtools from './../node_modules/@vue/devtools'

import App from './App.vue';
import router from './router';	
import store from '@/store/store';
import {FETCH_TABSETS_DATA} from '@/store/actions.type';


Vue.use(VueMaterial);
Vue.config.productionTip = true;
Vue.config.devtools = true;
devtools.connect("http://localhost", "8098");

new Vue({
  router,
  store,
  mounted() {
	store.dispatch(FETCH_TABSETS_DATA, 'tabsetsData');
  },
  render: h => h(App),
}).$mount('#app');