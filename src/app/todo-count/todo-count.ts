/// <reference path="../../_all.ts" />

import {Component, View, If} from 'angular2/angular2';

@Component({
  selector: 'todo-count',
  properties: {
    todos: 'todos'
  }
})
@View({
  templateUrl: `app/todo-count/todo-count.html`,
  directives: [If]
})
export class TodoCount {
  todos: number;
}