import {TodoCount} from "./todo-count";

describe('Todo Count Component', () => {
  var component: TodoCount;

  afterEach(() => {
    component = null;
  });
  
  it('should be defined', () => {
    component = new TodoCount();
    component.should.be.ok;
  });
});