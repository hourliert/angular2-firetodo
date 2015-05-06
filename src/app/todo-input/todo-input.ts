/// <reference path="../../_all.ts" />

import {Component, View, EventEmitter} from 'angular2/angular2';

@Component({
  selector: 'todo-input',
  events: ['newTodo']
})
@View({
  templateUrl: `app/todo-input/todo-input.html`
})
export class TodoInput {
  todoTitle: string;
  newTodo: EventEmitter;
  
  constructor() {
    this.todoTitle = '';
    this.newTodo = new EventEmitter();
  }
  
  update(todoTitle: string) {
    this.todoTitle = todoTitle;
  }
  
  submitTodo() {
    if (this.todoTitle) {
      this.newTodo.next(this.todoTitle);
    }
  }
}