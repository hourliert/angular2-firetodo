import {TodoFilter} from "./todo-filter";
import {TodoDisplayType} from "../interfaces/todo-filter";

describe('Todo Filter Component', () => {
  var component: TodoFilter;
  
  afterEach(() => {
    component = null;
  });
  
  it('should be defined', () => {
    component = new TodoFilter();   
    component.should.be.ok;
    component.newfilter.should.be.ok;
    
    component.filters.should.be.ok;
    component.filters.length.should.be.equal(3);
  });
  
  it('should select a new filter', () => {
    component = new TodoFilter();
    
    var spy = sinon.spy(component.newfilter, "next");
    
    component.selectFilter(TodoDisplayType.all);
    spy.calledOnce.should.be.ok;
    
    component.selectFilter(TodoDisplayType.completed);
    spy.calledTwice.should.be.ok;
    
    component.selectFilter(TodoDisplayType.active);
    spy.calledThrice.should.be.ok;
  });
});