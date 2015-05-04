/// <reference path="../../_all.ts" />

import {Component, View, bootstrap, For, If} from "angular2/angular2";
import {FriendsService} from "./friends.service";

@Component({
  selector: 'display',
  injectables: [FriendsService]
})
@View({
  templateUrl: 'app/display/show-properties.html',
  directives: [For, If]
})
export class DisplayComponent {
  time: string;
  names: string[];
 
  constructor(friends?: FriendsService) {
    setInterval(() => { 
      this.time = (new Date()).toString(); 
    }, 1000);
    
    this.names = friends.names;
  }
}