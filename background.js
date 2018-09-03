window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

chrome.browserAction.onClicked.addListener(() => {
  let closedTabs = [];

  chrome.tabs.query({}, (tabs) => {

    chrome.tabs.create({
      'url': chrome.extension.getURL('build/index.html')
    });
  });
});