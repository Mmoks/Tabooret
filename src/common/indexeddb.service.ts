import { Tabset } from '@/interface';

export const IndexedDbService = {

	openConnection(dbName: string) {
		return new Promise(resolve => {
			const request: any = indexedDB.open(dbName, 1);
			let db: object = {};

			request.onsuccess = () => {			
				resolve(request.result);
			};

		});
	},

	getObjectStore(db) {
		if (db) return db.transaction('tabsets', 'readwrite').objectStore('tabsets') 
		else return 'error' ;
	},
	
	fetchFullTabsetsData(store) {
		const fetchTabsetsData = store.getAll();			
		return new Promise(resolve => {
			fetchTabsetsData.onsuccess = (event) => {
				let result: Tabset[] = event.target.result; 
				resolve(result);
			}
		});
	},

	fetchClosedTabset() {
		return new Promise(resolve => {
			const chrome = window.chrome;
			
			chrome.runtime.sendMessage({type: 'fetchClosedTabset'}, (tabset: Tabset) => {
				resolve(tabset);
			});

		});
	},

	async deleteTab(tabset: Tabset) {
		const db = await this.openConnection('tabsetsData');
		const objectStore = this.getObjectStore(db);
		objectStore.put(tabset);		
		return new Promise(resolve => {
			objectStore.onsuccess = () => {
				resolve();
			};
		});
	},

	async deleteTabset(tabsetID: number) {
		const db = await this.openConnection('tabsetsData');
		const objectStore = this.getObjectStore(db);
		objectStore.delete(tabsetID);		
		return new Promise(resolve => {
			objectStore.onsuccess = () => {
				resolve();
			};
		});
	}
	
}