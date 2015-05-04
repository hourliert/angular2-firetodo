/// <reference path="../../_all.ts" />

import {FriendsService} from "./friends.service";

describe('Friend Service', () => {
  var service: FriendsService;
  
  beforeEach(() => {
    service = new FriendsService();
  });
  
  it('should be defined', () => {
    should.exist(service);
    service.names[0].should.equal("Aarav Ii");
  });  
});