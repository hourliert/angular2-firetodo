/// <reference path="../_all.ts" />

import {Component, bootstrap, View} from "angular2/angular2";

@Component({
  selector: 'todo-app'
})
@View({
  templateUrl: "app/app.html"
})
export class TodoApp {
  name: string;

  constructor() {
      this.name = 'Alice';
  }
}