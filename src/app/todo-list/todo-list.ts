/// <reference path="../../_all.ts" />

import {Component, View} from 'angular2/angular2';
import {Store, TodoFactory, TodoModel} from '../service/TodoStore';

@Component({
  selector: 'todo-list',
  injectables: [
    Store,
    TodoFactory
  ],
  hostListeners: {
    'store': 'onAddItem($event)'
  }
})
@View({
  templateUrl: `app/todo-list/todo_list.html`
})
export class TodoList {
  todosStore: Store<TodoModel>;
  todosFactory: TodoFactory;
  
  constructor(store: Store<TodoModel>, factory: TodoFactory) {
    this.todosStore = store;
    this.todosFactory = factory;
  }
  
  onNewTodo(todoTitle: string) {
    this.todosStore.add(this.todosFactory.createTodo(todoTitle, false));
  }
}