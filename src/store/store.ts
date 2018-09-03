import Vue from 'vue';
import Vuex from 'vuex';

import {IndexedDbService} from '@/common/indexeddb.service';  

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabsets: [],
  },
  mutations: {
    loadTabsets(state, paylaod) {
	    state.tabsets = paylaod;  	  
    }
  },
  actions: {
  	async loadTabsets({ commit }, paylaod: string) {  
      let responseData = await IndexedDbService.openConnection(paylaod);
      let store = IndexedDbService.createStore(responseData);
      let fullTabsetsData = await IndexedDbService.getFullTabsetsData(store);
      console.log(fullTabsetsData);

  //    console.log(indexedDBStore);
    //  commit("loadTabsets", JSON.stringify(indexedDBStore));
    }
  },
});