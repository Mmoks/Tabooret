import Vue from 'vue';
import Vuex from 'vuex';

import { IndexedDbService } from '@/common/indexeddb.service';  
import { SET_TABSETS_DATA, UPLOAD_NEW_TABSET} from './mutations.type'; 

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  state: {
    tabsets: [],
  },
  mutations: {
    uploadNewTabset(state, paylaod: Array<object>) {
      if(paylaod)
	    //@ts-ignore
      state.tabsets.push(paylaod);	  
    },
    setTabsetsData(state, paylaod: Array<[object]>) {
      //@ts-ignore
      state.tabsets = paylaod;    
    },


  },
  actions: {
  	async fetchTabsetsData({ commit }, paylaod: string) {
      const db = await IndexedDbService.openConnection(paylaod);
      const store = IndexedDbService.getObjectStore(db);
      const fullTabsetsData = await IndexedDbService.fetchFullTabsetsData(store);
      return commit(SET_TABSETS_DATA, fullTabsetsData);
    },

    async uploadNewTabset({ commit }, payload: string) {
      const newTabset = await IndexedDbService.fetchClosedTabset();  
      return commit(UPLOAD_NEW_TABSET, newTabset);
    },
  },

  getters: {
    fullTabsetsData(state) {
      return state.tabsets;
    }
  }
});