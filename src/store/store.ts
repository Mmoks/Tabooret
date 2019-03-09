import Vue from "vue";
import Vuex from "vuex";

import _ from "lodash";

import { IndexedDbService } from "@/common/indexeddb.service";
import {
  SET_TABSETS_DATA,
  UPLOAD_NEW_TABSET,
  DELETE_TABSET,
  UPDATE_TABSET,
  TOGGLE_TABSET_LOCKING,
  SET_TABSET_TABS,
  CHANGE_TABSET_NAME,
  TOGGLE_TABSET_STARING,
  SORT_BY_STAR,
  SORT_BY_TIME
} from "./mutations.type";

import { DeleteTabPayload, ChangeTabsetNamePayload } from "@/interface.ts";
import { Tab } from "@/containers/models/Tab.model";
import { Tabset } from "@/containers/models/Tabset.model";

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  state: {
    tabsets: [] as Tabset[],
    showOnlyStared: false as boolean
  },

  mutations: {
    uploadNewTabset(state, paylaod: Tabset) {
      state.tabsets.push(paylaod);
    },

    setTabsetsData(state, paylaod: Tabset[]) {
      state.tabsets = paylaod.reverse();
    },

    sortByStar(state, paylaod: Tabset[]) {
      console.log("23", paylaod);
      state.tabsets = paylaod;
    },

    sortByTime(state, payload: Tabset[]) {
      state.tabsets = payload;
    },

    setTabsetTabs(state, payload: Tabset) {
      let tabset: Tabset = state.tabsets.filter(
        (tabset: Tabset) => tabset.id === payload.id
      )[0];
      tabset.tabs = payload.tabs;
    },

    deleteTabset(state, payload: number) {
      state.tabsets = state.tabsets.filter(tabset => tabset.id !== payload);
    },

    toggleTabsetLocking(state, payload: number) {
      let tabset: Tabset = state.tabsets.filter(
        (tabset: Tabset) => tabset.id === payload
      )[0];
      tabset.locked = !tabset.locked;
    },
    toggleTabsetStaring(state, payload: number) {
      let tabset: Tabset = state.tabsets.filter(
        (tabset: Tabset) => tabset.id === payload
      )[0];
      tabset.stared = !tabset.stared;
    },

    changeTabsetName(state, payload: ChangeTabsetNamePayload) {
      let tabset: Tabset = state.tabsets.filter(
        (tabset: Tabset) => tabset.id === payload.id
      )[0];
      tabset.tabsetName = payload.tabsetName;
    },
    showOnlyStared(state, payload: boolean) {
      state.showOnlyStared = payload;
    }
  },

  actions: {
    async fetchTabsetsData(context, paylaod: string) {
      const db: object = await IndexedDbService.openConnection(paylaod);
      const objectStore: object = IndexedDbService.getObjectStore(db);
      const fullTabsetsData: Tabset[] = (await IndexedDbService.fetchFullTabsetsData(
        objectStore
      )) as Tabset[];
      return context.commit(SET_TABSETS_DATA, fullTabsetsData);
    },

    async uploadNewTabset(context, payload: string) {
      let newTabset: Tabset = (await IndexedDbService.fetchClosedTabset()) as Tabset;
      return context.commit(UPLOAD_NEW_TABSET, newTabset);
    },

    deleteTab(context, payload: DeleteTabPayload) {
      let tabset: Tabset = context.state.tabsets.filter(
        tabset => payload.tabsetID === tabset.id
      )[0];
      let newTabs: Tab[] = tabset.tabs.filter(tab => tab.id !== payload.tabID);
      let updatedTabset: Tabset = {
        createdAt: tabset.createdAt,
        id: tabset.id,
        tabs: newTabs,
        locked: tabset.locked,
        stared: tabset.stared,
        tabsetName: tabset.tabsetName
      };

      if (updatedTabset.tabs.length)
        IndexedDbService.updateTabset(updatedTabset).then(() =>
          context.commit(SET_TABSET_TABS, updatedTabset)
        );
      else
        IndexedDbService.deleteTabset(tabset.id).then(() =>
          context.commit(DELETE_TABSET, tabset.id)
        );
    },

    deleteTabset(context, payload: number) {
      IndexedDbService.deleteTabset(payload).then(() =>
        context.commit(DELETE_TABSET, payload)
      );
    },

    toggleTabsetLocking(context, payload: number) {
      let tabset: Tabset = context.state.tabsets.filter(
        tabset => payload === tabset.id
      )[0];
      let updatedTabset: Tabset = {
        createdAt: tabset.createdAt,
        id: tabset.id,
        tabs: tabset.tabs,
        locked: !tabset.locked,
        stared: tabset.stared,
        tabsetName: tabset.tabsetName,
        show: tabset.show
      };

      IndexedDbService.updateTabset(updatedTabset).then(() =>
        context.commit(TOGGLE_TABSET_LOCKING, payload)
      );
    },

    toggleTabsetStaring(context, payload: number) {
      let tabset: Tabset = context.state.tabsets.filter(
        tabset => payload === tabset.id
      )[0];
      let updatedTabset: Tabset = {
        createdAt: tabset.createdAt,
        id: tabset.id,
        tabs: tabset.tabs,
        locked: tabset.locked,
        stared: !tabset.stared,
        tabsetName: tabset.tabsetName
      };

      IndexedDbService.updateTabset(updatedTabset)
        .then(() => context.commit(TOGGLE_TABSET_STARING, payload))
        .then(() => context.dispatch(SORT_BY_STAR));
    },

    sortByStar(context) {
      let newTabsetsData: Tabset[] = [];

      for (let tabsetData of context.state.tabsets) {
        if (context.state.showOnlyStared && !tabsetData.stared) {
          tabsetData.show = false;
        } else {
          tabsetData.show = true;
        }

        if (tabsetData.stared) {
          newTabsetsData.unshift(tabsetData);
        } else {
          newTabsetsData.push(tabsetData);
        }
      }
      // console.log('NEW', newTabsetsData)
      context.commit(SORT_BY_STAR, newTabsetsData);
      context.dispatch(SORT_BY_TIME, newTabsetsData);
    },

    setShowProperty(context) {
      let tabsets: Tabset[] = context.state.tabsets;
      for (let tabset of tabsets) {
        tabset.show = true;
      }
      context.commit(SET_TABSETS_DATA, tabsets);
    },

    sortByTime(context, payload: Tabset[]) {
      const staredTabsets: Tabset[] = payload
        .filter((tabset: Tabset) => tabset.stared)
        .sort(
          (fitstTabset: Tabset, secondTabset: Tabset) =>
            +new Date(secondTabset.createdAt) - +new Date(fitstTabset.createdAt)
        );
      const unStaredTabsets: Tabset[] = payload
        .filter((tabset: Tabset) => !tabset.stared)
        .sort(
          (fitstTabset: Tabset, secondTabset: Tabset) =>
            +new Date(secondTabset.createdAt) - +new Date(fitstTabset.createdAt)
        );

      const allTabsets: Tabset[] = [...unStaredTabsets, ...staredTabsets];
      context.commit(SORT_BY_TIME, allTabsets.reverse());
    },

    changeTabsetName(context, payload: ChangeTabsetNamePayload) {
      const tabset: Tabset = context.state.tabsets.filter(
        tabset => payload.id === tabset.id
      )[0];
      const updatedTabset: Tabset = {
        createdAt: tabset.createdAt,
        id: tabset.id,
        tabs: tabset.tabs,
        locked: tabset.locked,
        stared: tabset.stared,
        tabsetName: payload.tabsetName
      };

      IndexedDbService.updateTabset(updatedTabset).then(() =>
        context.commit(CHANGE_TABSET_NAME, payload)
      );
    }
  },

  getters: {
    fullTabsetsData(state) {
      return state.tabsets;
    },
    showOnlyStared(state) {
      return state.showOnlyStared;
    }
  }
});
