import { Tab } from './Tab.model'

export interface Tabset {
  id: number
  tabs: Tab[]
  createdAt: Date
  tabsetName: string
  locked: boolean
  starred: boolean
  show?: boolean
}

export interface ChangeTabsetNamePayload {
  id: number
  tabsetName: string
}
