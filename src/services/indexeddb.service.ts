import { Tabset } from '@/models/Tabset.model'

export const IndexedDbService = {
  openConnection(dbName: string): Promise<any> {
    return new Promise(resolve => {
      const request: any = indexedDB.open(dbName, 1)
      request.onsuccess = () => {
        resolve(request.result)
      }
    })
  },

  getObjectStore(db): any {
    if (db) {
      return db.transaction('tabsets', 'readwrite').objectStore('tabsets')
    }
    return 'error'
  },

  fetchFullTabsetsData(store): Promise<Tabset[]> {
    const fetchTabsetsData = store.getAll()
    return new Promise(resolve => {
      fetchTabsetsData.onsuccess = event => {
        const result: Tabset[] = event.target.result
        resolve(result)
      }
    })
  },

  fetchClosedTabset(): Promise<Tabset> {
    return new Promise(resolve => {
      const chrome = window.chrome
      chrome.runtime.sendMessage(
        { type: 'fetchClosedTabset' },
        (tabset: Tabset) => {
          resolve(tabset)
        }
      )
    })
  },

  async updateTabset(tabset: Tabset): Promise<object> {
    const db = await this.openConnection('tabsetsData')
    const objectStore = this.getObjectStore(db)
    const req = objectStore.put(tabset)
    return new Promise(resolve => {
      req.onsuccess = () => {
        resolve()
      }
    })
  },

  async deleteTabset(tabsetID: number): Promise<object> {
    const db = await this.openConnection('tabsetsData')
    const objectStore = this.getObjectStore(db)
    const req = objectStore.delete(tabsetID)
    return new Promise(resolve => {
      req.onsuccess = () => {
        resolve()
      }
    })
  },
}
