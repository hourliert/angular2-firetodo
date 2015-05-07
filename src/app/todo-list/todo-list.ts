/// <reference path="../../_all.ts" />

import {Component, View, For} from 'angular2/angular2';
import {TodoStore, TodoFactory, TodoModel} from '../service/TodoStore';
import {Inject} from "angular2/di";

@Component({
  selector: 'todo-list',
  hostListeners: {
    'newtodo': 'onNewTodo($event)'
  }
})
@View({
  templateUrl: `app/todo-list/todo-list.html`,
  directives: [For]
})
export class TodoList {
  todoStore: TodoStore;
  todoFactory: TodoFactory;
  todoEdit: TodoModel;
  toto: string;
  
  constructor(@Inject(TodoStore) store: TodoStore, @Inject(TodoFactory) factory: TodoFactory) {
    this.todoStore = store;
    this.todoFactory = factory;
    this.toto = 'test';
  }
  
  onNewTodo(todoTitle: string) {
    this.todoStore.add(this.todoFactory.createTodo(todoTitle, false));
  }
  
  deleteTodo(todo: TodoModel) {
    this.todoStore.remove(todo);
  }
    
  editTodo(todo: TodoModel) {
    this.todoEdit = todo;
  }
  
  finishEditing($event: KeyboardEvent, todo: TodoModel) {
    if ($event.which === 13) { //enter key
      todo.title = (<any> $event.target).value;
      this.todoEdit = null;
    } else if ($event.which === 27) { //escap key
      (<any> $event.target).value = todo.title;
      this.todoEdit = null;
    }
  }
  
  toggleCompleteTodo(todo: TodoModel) {
    todo.completed = !todo.completed;
  }
  
  toggleAllTodo($event: MouseEvent) {
    this.todoStore.list.forEach((todo: TodoModel) => {
      todo.completed = (<any>$event.target).checked;
    });
  }
}