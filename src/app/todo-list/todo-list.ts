/// <reference path="../../_all.ts" />

import {Component, View, bootstrap, For, If} from 'angular2/angular2';

@Component({
  selector: 'todo-list'
})
@View({
  templateUrl: "app/todo-list/todo-list.html",
  directives: [For, If]
})
export class TodoList {
  todos: string[];
  
  constructor() {
    this.todos = ["Eat Breakfast", "Walk Dog", "Breathe"];
  }
  
  addTodo(todo: string) {
    this.todos.push(todo);
  }
  
  doneTyping($event) {
    if($event.which === 13) {
      this.addTodo($event.target.value);
      $event.target.value = null;
    }
  }
}

