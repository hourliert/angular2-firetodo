/// <reference path="../../_all.ts" />

import {Component, View, EventEmitter, For} from 'angular2/angular2';
import {TODO_DISPLAY, ITodoFilter} from "../service/TodoStore";

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
        type: TODO_DISPLAY.all
      },
      {
        label: 'Active',
        type: TODO_DISPLAY.active
      },
      {
        label: 'Completed',
        type: TODO_DISPLAY.completed
      }
    ];
  }
  
  selectFilter(type: TODO_DISPLAY) {
    this.newfilter.next(type);
  }
}