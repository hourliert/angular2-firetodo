/// <reference path="_all.ts" />

import {Component, bootstrap, View} from "angular2/angular2";
import {DisplayComponent} from "./components/show-properties";

@Component({
  selector: 'my-app'
})
@View({
  templateUrl: "lib/app.html",
  directives: [DisplayComponent]
})
class AppComponent {
  name: string;

  constructor() {
      this.name = 'Alice';
  }
}

bootstrap(AppComponent);