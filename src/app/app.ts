/// <reference path="../_all.ts" />

import {Component, bootstrap, View} from "angular2/angular2";
import {TodoInput} from "./todo-input/todo-input";
import {TodoList} from "./todo-list/todo-list";

@Component({
  selector: 'todo-app'
})
@View({
  templateUrl: "app/app.html",
  directives: [TodoInput, TodoList]
})
export class TodoApp {}