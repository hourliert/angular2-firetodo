/// <reference path="../../_all.ts" />

import {DisplayComponent} from "./show-properties";
import {FriendsService} from "./friends.service";

describe('show-properties component', function() {
  it('should be defined', function() {
    var component = new DisplayComponent(new FriendsService());
  });  
});