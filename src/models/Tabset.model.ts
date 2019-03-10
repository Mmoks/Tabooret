import { Tab } from './Tab.model'

export interface Tabset {
  id: number
  tabs: Tab[]
  createdAt: Date
  tabsetName: string
  locked: boolean
  stared: boolean
  show?: boolean
}
