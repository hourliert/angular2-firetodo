/// <reference path="../_all.ts" />

import {Component, bootstrap, View} from "angular2/angular2";
import {Inject} from "angular2/di";


import {TodoStore, TodoFactory} from './service/TodoStore';
import {TodoInput} from "./todo-input/todo-input";
import {TodoList} from "./todo-list/todo-list";
import {TodoCount} from "./todo-count/todo-count";

@Component({
  selector: 'todo-app',
  injectables: [
    TodoStore,
    TodoFactory
  ]
})
@View({
  templateUrl: "app/app.html",
  directives: [TodoInput, TodoList, TodoCount]
})
export class TodoApp {
  store: TodoStore;
  
  constructor(@Inject(TodoStore) store: TodoStore) {
    this.store = store;
  }
}