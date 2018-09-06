window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

const fetchChromeTabs = () => {
	return new Promise(resolve => {
		chrome.tabs.query({}, tabs => {
			resolve(tabs);
		});
	});
};

const createNewTab = () => {

	return new Promise(resolve => {
		chrome.tabs.create({
			'url': chrome.extension.getURL('build/index.html')
		}, (newTab) => {
			resolve(newTab);
		});
	});
}

const receiveMessage = (response) => {
	chrome.runtime.onMessage.addListener(
		(request, sender, sendResponse) => {
			if (request.type == "fetchClosedTabs")
				sendResponse(response);
		});
};

const closeTabs = (tabs, newTab) => {
	let processedTabs = [];

	for (let tab of tabs) {
		let notCurrentTab = newTab.id !== tab.id;
		let notNewTab = tab.url.indexOf("chrome://newtab") === -1;
		let notExtPage = tab.url.indexOf(newTab.url) === -1;

		if (notCurrentTab && notNewTab && notExtPage) {
			processedTabs.push(tab);
			//chrome.tabs.remove(tab.id);
		}
	}
	return processedTabs;
}

const fetchClosedTabs = async () => {
	const tabs = await fetchChromeTabs();
	const newTab = await createNewTab();
	const closedTabs = closeTabs(tabs, newTab);

	receiveMessage(closedTabs);
};

chrome.browserAction.onClicked.addListener(fetchClosedTabs);
