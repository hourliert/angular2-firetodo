/// <reference path="../../_all.ts" />

import {Component, View, EventEmitter} from 'angular2/angular2';
import {Todo} from '../services/todo-store';

@Component({
  selector: 'todo-input',
  events: ['newtodo']
})
@View({
  templateUrl: `app/todo-input/todo-input.html`
})
export class TodoInput {
  newtodo: EventEmitter;
  todoEdit: Todo;
  
  constructor() {
    this.newtodo = new EventEmitter();
  }
  
  update($event: KeyboardEvent, todoInput: HTMLInputElement) {
    if ($event.which === 13) { //enter key
      this.submitTodo(todoInput.value);
      todoInput.value = '';
    }
  }
  
  submitTodo(todoTitle: string) {
    if (todoTitle) {
      this.newtodo.next(todoTitle);
    }
  }
  
  editTodo(todo: Todo) {
    this.todoEdit = todo;
  }
}