/// <reference path="../../_all.ts" />

import {Component, View, EventEmitter} from 'angular2/angular2';
import {TodoModel} from '../service/TodoStore';

@Component({
  selector: 'todo-input',
  events: ['newtodo']
})
@View({
  templateUrl: `app/todo-input/todo-input.html`
})
export class TodoInput {
  newtodo: EventEmitter;
  todoEdit: TodoModel;
  
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
  
  editTodo(todo: TodoModel) {
    this.todoEdit = todo;
  }
}