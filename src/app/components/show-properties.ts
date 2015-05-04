/// <reference path="../../_all.ts" />

import {Component, View, bootstrap, For, If} from "angular2/angular2";
import {FriendsService} from "./friends.service";

@Component({
  selector: 'display',
  injectables: [FriendsService]
})
@View({
  templateUrl: 'app/components/show-properties.html',
  directives: [For, If]
})
export class DisplayComponent {
  myName: string;
  todos: Array<string>;
  time: string;
  names: string[];
 
  constructor(friends?: FriendsService) {
    this.myName = "Bob";
    
    setInterval(() => { 
      this.time = (new Date()).toString(); 
    }, 1000);
    
    this.names = friends.names;
  }
}