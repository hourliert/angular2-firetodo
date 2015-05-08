/// <reference path="../_all.ts" />

import {Component, bootstrap, View} from "angular2/angular2";
import {Inject} from "angular2/di";

import {FirebaseAdapter} from "./service/firebase-adapter";
import {TodoStore, TodoFactory} from './service/TodoStore';
import {TodoInput} from "./todo-input/todo-input";
import {TodoList} from "./todo-list/todo-list";
import {TodoCount} from "./todo-count/todo-count";
import {TodoFilter} from "./todo-filter/todo-filter";

@Component({
  selector: 'todo-app',
  injectables: [
    TodoStore,
    TodoFactory,
    FirebaseAdapter
  ]
})
@View({
  templateUrl: "app/app.html",
  directives: [TodoInput, TodoList, TodoCount, TodoFilter]
})
export class TodoApp {
  store: TodoStore;
  
  constructor(@Inject(TodoStore) store: TodoStore) {
    this.store = store;
  }
}