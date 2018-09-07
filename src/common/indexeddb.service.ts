import { Tabset } from "@/interface";

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

	getObjectStore(request) {
		if (request) return request.transaction("tabsets", "readwrite").objectStore("tabsets") 
		else return "error" ;
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
			
			chrome.runtime.sendMessage({type: "fetchClosedTabset"}, (tabset: Tabset) => {
				resolve(tabset);
			});

		});
	},
	
}