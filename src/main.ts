import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import VueInputAutowidth from 'vue-input-autowidth'

// import devtools from './../node_modules/@vue/devtools'

import App from './App.vue';
import router from './router';	
import store from '@/store/store';
import {FETCH_TABSETS_DATA, SORT_BY_STAR, UPLOAD_NEW_TABSET} from '@/store/actions.type';


Vue.use(VueMaterial);
Vue.use(VueInputAutowidth);

Vue.config.productionTip = true;
Vue.config.devtools = true;

new Vue({
  router,
  store,
   mounted() {
  	store.dispatch(UPLOAD_NEW_TABSET, 'tabsetsData').then(async () => {
      await store.dispatch(FETCH_TABSETS_DATA, 'tabsetsData');
      await store.dispatch(SORT_BY_STAR);
    });
  },
  render: h => h(App),
}).$mount('#app');