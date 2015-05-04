/// <reference path="../../_all.ts" />

import {DisplayComponent} from "./show-properties";
import {FriendsService} from "./friends.service";

class FriendsMock extends FriendsService {
  constructor() {
    super();
    this.names = ["Aarav Ii", "Ma rtín", "Shannon", "Ariana <3", "Kai"];
  }
}

describe('show-properties component', () => {
  var component: DisplayComponent;
  var friendsMock = new FriendsMock()
  
  beforeEach(() => {
    component = new DisplayComponent(friendsMock);
  });
  
  it('should be defined', () => {
    should.exist(component);
    component.names[0].should.equal("Aarav Ii");
  });  
});