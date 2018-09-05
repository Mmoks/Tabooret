import {indexedDBSuccessRequestData} from "@/interface";

export const IndexedDbService = {
	openConnection(dbName: string) {

		return new Promise(resolve => {
			const request = indexedDB.open(dbName, 1);
			request.onsuccess = () => {			
				resolve(request.result);
			}
		});

	},
	createStore(request) {
		if (request) return request.transaction("tabsets", "readwrite").objectStore("tabsets") 
		else return "error" ;
	},
	fetchFullTabsetsData(store) {
		const fetchTabsetsData = store.getAll();
			
		return new Promise(resolve => {
			fetchTabsetsData.onsuccess = (event) => {
				let result: Array<object> = event.target.result; 
				resolve(result);
			}
		})
	},
	fetchClosedTabs() {
		return new Promise(resolve => {
			const chrome = window.chrome;
			
			chrome.runtime.sendMessage({type: "fetchClosedTabs"}, (response) => {
				resolve(response);
			});

		});
	},
}