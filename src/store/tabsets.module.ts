import { TabsestsModuleState } from './state.model'
import { Tabset, ChangeTabsetNamePayload } from '@/models/Tabset.model'
import { IndexedDbService } from '@/services/indexeddb.service'
import * as mutationsTypes from './mutations.type'
import { Tab, DeleteTabPayload } from '@/models/Tab.model'
import { FETCH_TABSETS_DATA } from './actions.type'
import { DB_NAME } from '@/consts'

const initialState: TabsestsModuleState = {
  tabsets: [],
  showOnlyStarred: false,
}

export const state = { ...initialState }
export const mutations = {
  uploadNewTabset(state: TabsestsModuleState, paylaod: Tabset) {
    state.tabsets.push(paylaod)
  },

  setTabsetsData(state: TabsestsModuleState, paylaod: Tabset[]) {
    state.tabsets = paylaod.reverse()
  },

  sortByStar(state: TabsestsModuleState, paylaod: Tabset[]) {
    state.tabsets = paylaod
  },

  sortByTime(state: TabsestsModuleState, payload: Tabset[]) {
    state.tabsets = payload
  },

  setTabsetTabs(state: TabsestsModuleState, payload: Tabset) {
    const tabset: Tabset = state.tabsets.filter(
      (tabset: Tabset) => tabset.id === payload.id
    )[0]
    tabset.tabs = payload.tabs
  },

  deleteTabset(state: TabsestsModuleState, payload: number) {
    state.tabsets = state.tabsets.filter(tabset => tabset.id !== payload)
  },

  toggleTabsetLocking(state: TabsestsModuleState, payload: number) {
    const tabset: Tabset = state.tabsets.filter(
      (tabset: Tabset) => tabset.id === payload
    )[0]
    tabset.locked = !tabset.locked
  },
  toggleTabsetStaring(state: TabsestsModuleState, payload: number) {
    const tabset: Tabset = state.tabsets.filter(
      (tabset: Tabset) => tabset.id === payload
    )[0]
    tabset.starred = !tabset.starred
  },

  changeTabsetName(
    state: TabsestsModuleState,
    payload: ChangeTabsetNamePayload
  ) {
    const tabset: Tabset = state.tabsets.filter(
      (tabset: Tabset) => tabset.id === payload.id
    )[0]
    tabset.tabsetName = payload.tabsetName
  },

  showOnlyStarred(
    state: TabsestsModuleState,
    payload: { tabsets: Tabset[]; value: boolean }
  ) {
    state.tabsets = payload.tabsets
    state.showOnlyStarred = payload.value
  },

  setShowProperty(state: TabsestsModuleState, payload: Tabset[]) {
    state.tabsets = payload.map(tabset => ({
      ...tabset,
      show: true,
    }))
  },

  filterTabsetsByName(state: TabsestsModuleState, payload: Tabset[]) {
    state.tabsets = payload
  },
}

export const actions = {
  async fetchTabsetsData(context) {
    const db: object = await IndexedDbService.openConnection(DB_NAME)
    const objectStore: object = IndexedDbService.getObjectStore(db)
    const fullTabsetsData: Tabset[] = (await IndexedDbService.fetchFullTabsetsData(
      objectStore
    ))
      .map((tabset: Tabset) => ({ ...tabset, show: true }))
      .filter((tabset: Tabset) => tabset.tabs.length) as Tabset[]
    return context.commit(mutationsTypes.SET_TABSETS_DATA, fullTabsetsData)
  },

  async uploadNewTabset(context) {
    const newTabset: Tabset = (await IndexedDbService.fetchClosedTabset()) as Tabset
    return newTabset && newTabset.tabs
      ? context.commit(mutationsTypes.UPLOAD_NEW_TABSET, newTabset)
      : null
  },

  deleteTab(context, payload: DeleteTabPayload) {
    const tabset: Tabset = context.state.tabsets.filter(
      tabset => payload.tabsetId === tabset.id
    )[0]
    const newTabs: Tab[] = tabset.tabs.filter(tab => tab.id !== payload.tabId)
    const updatedTabset: Tabset = {
      ...tabset,
      tabs: newTabs,
    }

    if (updatedTabset.tabs.length) {
      return IndexedDbService.updateTabset(updatedTabset).then(() =>
        context.commit(mutationsTypes.SET_TABSET_TABS, updatedTabset)
      )
    }
    return IndexedDbService.deleteTabset(tabset.id).then(() =>
      context.commit(mutationsTypes.DELETE_TABSET, tabset.id)
    )
  },

  deleteTabset(context, payload: number) {
    IndexedDbService.deleteTabset(payload).then(() =>
      context.commit(mutationsTypes.DELETE_TABSET, payload)
    )
  },

  toggleTabsetLocking(context, payload: number) {
    const tabset: Tabset = context.state.tabsets.filter(
      tabset => payload === tabset.id
    )[0]
    const updatedTabset: Tabset = {
      ...tabset,
      locked: !tabset.locked,
    }

    IndexedDbService.updateTabset(updatedTabset).then(() =>
      context.commit(mutationsTypes.TOGGLE_TABSET_LOCKING, payload)
    )
  },

  toggleTabsetStaring(context, payload: number) {
    const tabset: Tabset = context.state.tabsets.filter(
      tabset => payload === tabset.id
    )[0]
    const updatedTabset: Tabset = {
      ...tabset,
      starred: !tabset.starred,
    }

    IndexedDbService.updateTabset(updatedTabset)
      .then(() => context.commit(mutationsTypes.TOGGLE_TABSET_STARING, payload))
      .then(() => context.dispatch(mutationsTypes.SORT_BY_STAR))
  },

  sortByStar(context) {
    const newTabsetsData: Tabset[] = context.state.tabsets
      .map((tabset: Tabset) => {
        return {
          ...tabset,
          show:
            (context.state.showOnlyStarred && !tabset.starred) ||
            !context.state.showOnlyStarred,
        }
      })
      .sort((firstTabset: Tabset, secondTabset: Tabset) => {
        if (firstTabset.starred && !secondTabset.starred) {
          return -1
        } else if (firstTabset.starred && secondTabset.starred) {
          return 0
        }
        return 1
      })
    context.commit(mutationsTypes.SORT_BY_STAR, newTabsetsData)
    context.dispatch(mutationsTypes.SORT_BY_TIME, newTabsetsData)
  },

  setShowProperty(context) {
    context.commit(mutationsTypes.SET_SHOW_PROPERTY, context.state.tabsets)
  },

  sortByTime(context, payload: Tabset[]) {
    const starredTabsets: Tabset[] = payload
      .filter((tabset: Tabset) => tabset.starred)
      .sort(
        (fitstTabset: Tabset, secondTabset: Tabset) =>
          +new Date(secondTabset.createdAt) - +new Date(fitstTabset.createdAt)
      )
    const unStarredTabsets: Tabset[] = payload
      .filter((tabset: Tabset) => !tabset.starred)
      .sort(
        (fitstTabset: Tabset, secondTabset: Tabset) =>
          +new Date(secondTabset.createdAt) - +new Date(fitstTabset.createdAt)
      )

    const allTabsets: Tabset[] = [...unStarredTabsets, ...starredTabsets]
    context.commit(mutationsTypes.SORT_BY_TIME, allTabsets.reverse())
  },

  changeTabsetName(context, payload: ChangeTabsetNamePayload) {
    const tabset: Tabset = context.state.tabsets.filter(
      tabset => payload.id === tabset.id
    )[0]
    const updatedTabset: Tabset = {
      ...tabset,
      tabsetName: payload.tabsetName,
    }

    IndexedDbService.updateTabset(updatedTabset).then(() =>
      context.commit(mutationsTypes.CHANGE_TABSET_NAME, payload)
    )
  },

  async showOnlyStarred(context, payload: boolean) {
    const tabsets: Tabset[] = await IndexedDbService.getTabsets()
    context.commit(mutationsTypes.SHOW_ONLY_STARRED, {
      tabsets: tabsets.filter((tabset: Tabset) =>
        payload ? tabset.starred : true
      ),
      value: payload,
    })
  },
  async filterTabsetsByName(context, payload: string) {
    const tabsets: Tabset[] = await IndexedDbService.getTabsets()
    context.commit(
      mutationsTypes.FILTER_TABSETS_BY_NAME,
      tabsets.filter((tabset: Tabset) => {
        return (
          tabset.tabsetName.toLowerCase().indexOf(payload) !== -1 ||
          tabset.tabs.reduce((index: boolean, tab: Tab) => {
            return (
              tab.url.toLowerCase().indexOf(payload) !== -1 ||
              tab.title.toLowerCase().indexOf(payload) !== -1 ||
              index
            )
          }, false)
        )
      })
    )
  },
}

export const getters = {
  tabsets(state: TabsestsModuleState) {
    return state.tabsets
  },
  showOnlyStarred(state: TabsestsModuleState) {
    return state.showOnlyStarred
  },
  starredTabsetsCount(state: TabsestsModuleState) {
    return state.tabsets.filter((tabset: Tabset) => tabset.starred).length
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
