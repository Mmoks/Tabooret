import Vue from 'vue';
import Vuex from 'vuex';

import { IndexedDbService } from '@/common/indexeddb.service';  
import { SET_TABSETS_DATA, UPLOAD_NEW_TABSET, DELETE_TAB, DELETE_TABSET } from './mutations.type'; 
import { Tabset, DeleteTabPayload } from '@/interface.ts'


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

    deleteTab(state, payload: Tabset) {
      state.tabsets.map((tabset: Tabset) => tabset.id === payload.id ? payload : tabset);
    },

    deleteTabset(state, payload: number) {
      state.tabsets = state.tabsets.filter(tabset => tabset.id !== payload);
    }
    
  },

  actions: {
  	async fetchTabsetsData(context, paylaod: string) {
      const db: object = await IndexedDbService.openConnection(paylaod);
      const objectStore: object = IndexedDbService.getObjectStore(db);
      const fullTabsetsData: Tabset[] = await IndexedDbService.fetchFullTabsetsData(objectStore) as Tabset[];
      return context.commit(SET_TABSETS_DATA, fullTabsetsData);
    },

    async uploadNewTabset(context, payload: string) {
      let newTabset: Tabset = await IndexedDbService.fetchClosedTabset() as Tabset;  
      return context.commit(UPLOAD_NEW_TABSET, newTabset);
    },

    deleteTab(context, payload: DeleteTabPayload) {
       let tabset:Tabset = context.state.tabsets.filter(tabset => payload.tabsetID === tabset.id)[0]
          Object.freeze(tabset);
          tabset.tabs = tabset.tabs.filter(tab => tab.id !== payload.tabID);
       
       if (tabset.tabs.length) {
         IndexedDbService.deleteTab(tabset).then(() => context.commit(DELETE_TAB, payload));
       } else {
         IndexedDbService.deleteTabset(tabset.id).then(() => context.commit(DELETE_TABSET, tabset.id));                 
      }

    },

    deleteTabset(context, payload: number) {
      IndexedDbService.deleteTabset(payload).then(() => context.commit(DELETE_TABSET, payload));
    },

  },

  getters: {
    fullTabsetsData(state) {
      return state.tabsets.reverse();
    }
  }
});