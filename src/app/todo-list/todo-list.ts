/// <reference path="../../_all.ts" />

import {Component, View, For} from 'angular2/angular2';
import {TodoStore, TodoFactory, Todo} from '../services/todo-store';
import {TodoDisplayType} from "../interfaces/todo-filter";
import {Inject} from "angular2/di";

@Component({
  selector: 'todo-list',
  hostListeners: {
    'newtodo': 'onNewTodo($event)',
    'newfilter': 'onNewFilter($event)'
  },
  properties: {
    filter: 'display'
  }
})
@View({
  templateUrl: `app/todo-list/todo-list.html`,
  directives: [For]
})
export class TodoList {
  todoStore: TodoStore;
  todoFactory: TodoFactory;
  todoEdit: Todo;
  
  constructor(@Inject(TodoStore) store: TodoStore, @Inject(TodoFactory) factory: TodoFactory) {
    this.todoStore = store;
    this.todoFactory = factory;
  }
  
  onNewTodo(todoTitle: string) {
    this.todoStore.add(this.todoFactory.createTodo(todoTitle, false, false));
  }
  
  deleteTodo(todo: Todo) {
    this.todoStore.remove(todo);
  }
    
  editTodo(todo: Todo) {
    this.todoEdit = todo;
  }
  
  finishEditing($event: KeyboardEvent, todo: Todo) {
    if ($event.which === 13) { //enter key
      todo.title = (<any> $event.target).value;
      this.todoEdit = null;
    } else if ($event.which === 27) { //escap key
      (<any> $event.target).value = todo.title;
      this.todoEdit = null;
    }
  }
  
  toggleCompleteTodo(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoStore.save(todo);
  }
  
  toggleAllTodo($event: MouseEvent) {
    this.todoStore.list.forEach((todo: Todo) => {
      todo.completed = (<any>$event.target).checked;
      this.todoStore.save(todo);
    });
  }
  
  clearCompleted() {
    this.todoStore.removeBy(todo => todo.completed);
  }
  
  onNewFilter(display: TodoDisplayType) {
    console.log(display);
    this.todoStore.forEachTodo((todo: Todo) => {
      if (todo.completed) {
        switch (display) {
          case TodoDisplayType.all:
            todo.hidden = false;
            break;
          case TodoDisplayType.active:
            todo.hidden = true;
            break;
          case TodoDisplayType.completed:
            todo.hidden = false;
            break;
        }
      } else {
        switch (display) {
          case TodoDisplayType.all:
            todo.hidden = false;
            break;
          case TodoDisplayType.active:
            todo.hidden = false;
            break;
          case TodoDisplayType.completed:
            todo.hidden = true;
            break;
        }
      }
    });
  }
}