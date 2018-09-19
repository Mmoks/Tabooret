import Vue from 'vue';
import Vuex from 'vuex';

import {IndexedDbService} from '@/common/indexeddb.service';
import {
  SET_TABSETS_DATA, UPLOAD_NEW_TABSET,
  DELETE_TABSET, UPDATE_TABSET,
  TOGGLE_TABSET_LOCKING, SET_TABSET_TABS,
  CHANGE_TABSET_NAME,
  RESTORE_TABSET
} from './mutations.type';
import {Tabset, DeleteTabPayload, Tab, ChangeTabsetNamePayload} from '@/interface.ts'


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

    setTabsetTabs(state, payload: Tabset) {
      let tabset: Tabset = state.tabsets.filter((tabset: Tabset) => tabset.id === payload.id)[0];
      tabset.tabs = payload.tabs;
    },

    deleteTabset(state, payload: number) {
      state.tabsets = state.tabsets.filter(tabset => tabset.id !== payload);
    },

    toggleTabsetLocking(state, payload: number) {
      let tabset: Tabset = state.tabsets.filter((tabset: Tabset) => tabset.id === payload)[0];
      tabset.locked = !tabset.locked;
    },

    changeTabsetName(state, payload: ChangeTabsetNamePayload) {
      let tabset: Tabset = state.tabsets.filter((tabset: Tabset) => tabset.id === payload.id)[0];
      tabset.tabsetName = payload.tabsetName;
    },

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
      let tabset: Tabset = context.state.tabsets.filter(tabset => payload.tabsetID === tabset.id)[0]
      let newTabs: Tab[] = tabset.tabs.filter(tab => tab.id !== payload.tabID);
      let updatedTabset: Tabset = {
        createdAt: tabset.createdAt,
        id: tabset.id,
        tabs: newTabs,
        locked: tabset.locked,
        tabsetName: tabset.tabsetName,
      };

      if (updatedTabset.tabs.length)
        IndexedDbService.updateTabset(updatedTabset).then(() => context.commit(SET_TABSET_TABS, updatedTabset));
      else
        IndexedDbService.deleteTabset(tabset.id).then(() => context.commit(DELETE_TABSET, tabset.id));

    },

    deleteTabset(context, payload: number) {
      IndexedDbService.deleteTabset(payload).then(() => context.commit(DELETE_TABSET, payload));
    },

    toggleTabsetLocking(context, payload: number) {
      let tabset: Tabset = context.state.tabsets.filter(tabset => payload === tabset.id)[0]
      let updatedTabset: Tabset = {
        createdAt: tabset.createdAt,
        id: tabset.id,
        tabs: tabset.tabs,
        locked: !tabset.locked,
        tabsetName: tabset.tabsetName,
      };

      IndexedDbService.updateTabset(updatedTabset).then(() => context.commit(TOGGLE_TABSET_LOCKING, payload));
    },

    changeTabsetName(context, payload: ChangeTabsetNamePayload) {
      let tabset: Tabset = context.state.tabsets.filter(tabset => payload.id === tabset.id)[0]
      let updatedTabset: Tabset = {
        createdAt: tabset.createdAt,
        id: tabset.id,
        tabs: tabset.tabs,
        locked: tabset.locked,
        tabsetName: payload.tabsetName,
      };

      IndexedDbService.updateTabset(updatedTabset).then(() => context.commit(CHANGE_TABSET_NAME, payload));
    },

   async restoreTabset(context, payload: Tab[]) {
      for (let i of payload) {
        await window.chrome.tabs.create({
          'url': i.url,
          'active': false
        });
      }
      console.log('All tabs have been opened')
    }
  },

  getters: {
    fullTabsetsData(state) {
      return state.tabsets.reverse();
    }
  }
});