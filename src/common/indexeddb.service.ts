import {indexedDBSuccessRequestData} from "@/interface";


export const IndexedDbService = {
	openConnection(dbName: string) {

		return new Promise((resolve) => {
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
	getFullTabsetsData(store) {
		const getTabsetsData = store.getAll();
			
		return new Promise((resolve) => {
			getTabsetsData.onsuccess = (event) => {
				let result: Array<Object> = event.target.result; 
				resolve(result);
			}
		})
	},
}