import Vue from 'vue';
import Vuex from 'vuex';

import { IndexedDbService } from '@/common/indexeddb.service';  
import { SET_TABSETS_DATA, UPLOAD_NEW_TABSET, UPDATE_TABSET, DELETE_TABSET } from './mutations.type'; 
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

    updateTabset(state, payload: Tabset) {
      state.tabsets.map((tabset: Tabset) => tabset.id === payload.id ? payload : tabset);
    },

    deleteTabset(state, payload: number) {
      state.tabsets.map(tabset => tabset.id !== payload ? tabset : undefined);
    }
    
  },

  actions: {
  	async fetchTabsetsData({ commit }, paylaod: string) {
      const db: object = await IndexedDbService.openConnection(paylaod);
      const store: object = IndexedDbService.getObjectStore(db);
      const fullTabsetsData: Tabset[] = await IndexedDbService.fetchFullTabsetsData(store) as Tabset[];
      return commit(SET_TABSETS_DATA, fullTabsetsData);
    },

    async uploadNewTabset({ commit }, payload: string) {
      let newTabset: Tabset = await IndexedDbService.fetchClosedTabset() as Tabset;  
      return commit(UPLOAD_NEW_TABSET, newTabset);
    },

    async deleteTab(context, payload: DeleteTabPayload) {
       let tabset:Tabset = context.state.tabsets.filter(tabset => payload.tabsetID === tabset.id)[0]
       tabset.tabs = tabset.tabs.filter(tab => tab.id !== payload.tabID);
       if (tabset.tabs.length) {
         console.log(tabset.tabs);
         IndexedDbService.deleteTab(tabset).then(() => context.commit(UPDATE_TABSET, tabset));
       }
       else {
         console.log("deleteTabset");
         IndexedDbService.deleteTabset(tabset.id).then(() => context.commit(DELETE_TABSET, tabset.id));                 
      }
    }
  },

  getters: {
    fullTabsetsData(state) {
      console.log(state.tabsets)
      return state.tabsets.reverse();
    }
  }
});