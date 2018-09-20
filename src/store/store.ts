import Vue from 'vue';
import Vuex from 'vuex';

import {IndexedDbService} from '@/common/indexeddb.service';
import {
  SET_TABSETS_DATA, UPLOAD_NEW_TABSET,
  DELETE_TABSET, UPDATE_TABSET,
  TOGGLE_TABSET_LOCKING, SET_TABSET_TABS,
  CHANGE_TABSET_NAME,
  TOGGLE_TABSET_STARING, SORT_BY_STAR
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
      state.tabsets = paylaod.reverse();
    },

    sortByStar(state, paylaod: Tabset[]) {
      //@ts-ignore
      state.tabsets = [state.tabsets, ...paylaod].reverse();
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
    toggleTabsetStaring(state, payload: number) {
      let tabset: Tabset = state.tabsets.filter((tabset: Tabset) => tabset.id === payload)[0];
      tabset.stared = !tabset.stared;
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
        stared: tabset.stared,
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
        stared: tabset.stared,
        tabsetName: tabset.tabsetName,
      };

      IndexedDbService.updateTabset(updatedTabset).then(() => context.commit(TOGGLE_TABSET_LOCKING, payload));
    },
    toggleTabsetStaring(context, payload: number) {
      let tabset: Tabset = context.state.tabsets.filter(tabset => payload === tabset.id)[0]
      let updatedTabset: Tabset = {
        createdAt: tabset.createdAt,
        id: tabset.id,
        tabs: tabset.tabs,
        locked: tabset.locked,
        stared: !tabset.stared,
        tabsetName: tabset.tabsetName,
      };
      IndexedDbService.updateTabset(updatedTabset).then(() => context.commit(TOGGLE_TABSET_STARING, payload)).then(() => context.dispatch(SORT_BY_STAR));
    },
    sortByStar(context) {
      let newTabsetsData: Tabset[] = [];

      for (let tabsetData of context.state.tabsets) {
        console.log(tabsetData)
        if (tabsetData.stared) {
          newTabsetsData.unshift(tabsetData);
        } else {
          newTabsetsData.push(tabsetData);
        }
      }
      newTabsetsData.reverse();

      context.commit(SORT_BY_STAR, newTabsetsData)
    },

    changeTabsetName(context, payload: ChangeTabsetNamePayload) {
      let tabset: Tabset = context.state.tabsets.filter(tabset => payload.id === tabset.id)[0]
      let updatedTabset: Tabset = {
        createdAt: tabset.createdAt,
        id: tabset.id,
        tabs: tabset.tabs,
        locked: tabset.locked,
        stared: tabset.stared,
        tabsetName: payload.tabsetName,
      };

      IndexedDbService.updateTabset(updatedTabset).then(() => context.commit(CHANGE_TABSET_NAME, payload));
    },
  },

  getters: {
    fullTabsetsData(state) {
      return state.tabsets;
    }
  }
});