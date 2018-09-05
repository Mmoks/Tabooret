import Vue from 'vue';
import Vuex from 'vuex';

import { IndexedDbService } from '@/common/indexeddb.service';  
import { SET_TABSETS_DATA } from './mutations.type'; 


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabsets: [],
  },
  mutations: {
    setTabsetsData(state, paylaod: Array<object>) {
	    state.tabsets.push(paylaod);	  
    }
  },
  actions: {
  	async fetchTabsetsData({ commit }, paylaod: string) {
      const responseData = await IndexedDbService.openConnection(paylaod);
      const store = IndexedDbService.createStore(responseData);
      const fullTabsetsData = await IndexedDbService.fetchFullTabsetsData(store);
      const closedTabs = await IndexedDbService.fetchClosedTabs();      

      return commit(SET_TABSETS_DATA, closedTabs);
    }
  },
});