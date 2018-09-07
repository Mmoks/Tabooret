import Vue from 'vue';
import Vuex from 'vuex';

import { IndexedDbService } from '@/common/indexeddb.service';  
import { SET_TABSETS_DATA, UPLOAD_NEW_TABSET} from './mutations.type'; 
import { Tabset } from '@/interface.ts'


Vue.use(Vuex);
Vue.config.devtools = true;
 
export default new Vuex.Store({
  state: {
    tabsets: [] as Tabset[]
  },
  mutations: {
    uploadNewTabset(state, paylaod: Tabset) {
      state.tabsets.push(paylaod);	  
    },
    setTabsetsData(state, paylaod: Tabset[]) {      
      state.tabsets = paylaod;    
    },


  },
  actions: {
  	async fetchTabsetsData({ commit }, paylaod: string) {
      const db: object = await IndexedDbService.openConnection(paylaod);
      const store: object = IndexedDbService.getObjectStore(db);
      const fullTabsetsData: Tabset[] = await IndexedDbService.fetchFullTabsetsData(store) as Tabset[];
      return commit(SET_TABSETS_DATA, fullTabsetsData);
    },

    async uploadNewTabset({ commit }, payload: string) {
      const newTabset: Tabset = await IndexedDbService.fetchClosedTabset() as Tabset;  
      return commit(UPLOAD_NEW_TABSET, newTabset);
    },
  },

  getters: {
    fullTabsetsData(state) {
      return state.tabsets.reverse();
    }
  }
});