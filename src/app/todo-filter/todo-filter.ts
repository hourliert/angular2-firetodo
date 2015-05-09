/// <reference path="../../_all.ts" />

import {Component, View, EventEmitter, For} from 'angular2/angular2';
import {TodoDisplayType, ITodoFilter} from "../interfaces/todo-filter";

@Component({
  selector: 'todo-filter',
  events: ['newfilter']
})
@View({
  templateUrl: `app/todo-filter/todo-filter.html`,
  directives: [For]
})
export class TodoFilter {
  newfilter: EventEmitter;
  filters: ITodoFilter[];
  
  constructor() {
    this.newfilter = new EventEmitter();
    this.filters = [
      {
        label: 'All',
        type: TodoDisplayType.all
      },
      {
        label: 'Active',
        type: TodoDisplayType.active
      },
      {
        label: 'Completed',
        type: TodoDisplayType.completed
      }
    ];
  }
  
  selectFilter(type: TodoDisplayType) {
    this.newfilter.next(type);
  }
}