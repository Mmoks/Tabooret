window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

const fetchChromeTabs = () => {
	return new Promise(resolve => {
		chrome.tabs.query({}, tabs => {
			resolve(tabs);
		});
	});
};

const openConnection = (dbName) => {
	return new Promise(resolve => {
		const request = indexedDB.open(dbName, 1);
		let db = null;
		console.log(request);
		request.onsuccess = () => {
			if (request.result.objectStoreNames.length)
				resolve(request.result);
		};
		request.onupgradeneeded = (event) => {
			db = event.target;
			console.log(db);
			const objectStore = db.result.createObjectStore('tabsets', {
				keyPath: 'id'
			});

			objectStore.onsuccess = () => {				
				resolve(db.result);
			};
		};
	});
};

const getObjectStore = (db) => {
	if (db) return db.transaction('tabsets', 'readwrite').objectStore('tabsets')
	else return 'error';
};

const createNewTab = () => {
	return new Promise(resolve => {
		chrome.tabs.create({
			'url': chrome.extension.getURL('index.html')
		}, (newTab) => {
			resolve(newTab);
		});
	});
}

const receiveMessage = (response) => {
	chrome.runtime.onMessage.addListener(
		(request, sender, sendResponse) => {
			if (request.type == 'fetchClosedTabset')
				sendResponse(response);
		});
};

const closeTabs = (tabs, newTab) => {
	let processedTabs = [];

	for (let tab of tabs) {
		let notCurrentTab = newTab.id !== tab.id;
		let notNewTab = tab.url.indexOf('chrome://newtab') === -1;
		let notExtPage = tab.url.indexOf(newTab.url) === -1;

		if (notCurrentTab && notNewTab && notExtPage) {
			processedTabs.push(tab);
			//chrome.tabs.remove(tab.id);
		}
	}
	return processedTabs;
};

const uploadTabsetToIndexedDB = (store, tabset) => {
	const createdAt = new Date();
	const processedTabset = {
		id: +createdAt,
		tabs: tabset,
		locked: false,
		createdAt: createdAt,
		tabsetName: ''
	};

	const req = store.put(processedTabset);
	
	return new Promise(resolve => {		
		req.onsuccess = () => resolve(processedTabset);	
	});
};

const fetchClosedTabset = async () => {
	const tabs = await fetchChromeTabs();
	const newTab = await createNewTab();
	const closedTabset = closeTabs(tabs, newTab);
	const db = await openConnection('tabsetsData');
	const store = getObjectStore(db);
	const processedTabset = await uploadTabsetToIndexedDB(store, closedTabset);
	receiveMessage(processedTabset);
};

chrome.browserAction.onClicked.addListener(fetchClosedTabset);