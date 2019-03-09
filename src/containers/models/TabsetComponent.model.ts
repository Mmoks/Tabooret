import { Tabset } from "./Tabset.model";

export interface TabsetDataInterface {
  nameIsEditing: boolean;
  tabsetName: string;
  isHovered: boolean;
}

export interface TabsetPropsInterface {
  tabset: Tabset;
}
