export interface Tab {
	active: boolean,
	audible: boolean,
	autoDiscardable: boolean,
	discarded: boolean,
	favIconUrl: string,
	highlighted: boolean,
	id: number,
	incognito: boolean,
	index: number,
	mutedInfo : object,
	pinned: boolean,
	selected: boolean,
	status: string,
	title: string,
	url: string,
	width: number,
	windowId: number,
}

export interface Tabset {
	id: number,
	tabs: Tab[],
	createdAt: Date,
	tabsetName: string,
	locked: boolean,
}

export interface DeleteTabPayload {
	tabID: number,
	tabsetID: number,
}

export interface ChangeTabsetNamePayload {
	id: number,
	tabsetName: string
}