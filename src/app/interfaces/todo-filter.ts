/// <reference path="../../_all.ts" />



export enum TodoDisplayType {
  all, active, completed
}

export interface ITodoFilter {
  label: string;
  type: TodoDisplayType;
}