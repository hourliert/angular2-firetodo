/// <reference path="../_all.ts" />

import {Component, bootstrap, View} from "angular2/angular2";
import {DisplayComponent} from "./display/show-properties";
import {TodoList} from "./todo-list/todo-list";

@Component({
  selector: 'my-app'
})
@View({
  templateUrl: "app/app.html",
  directives: [DisplayComponent, TodoList]
})
class AppComponent {
  name: string;

  constructor() {
      this.name = 'Alice';
  }
}

bootstrap(AppComponent);