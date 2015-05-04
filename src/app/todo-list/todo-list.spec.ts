/// <reference path="../../_all.ts" />

import {TodoList} from "./todo-list";


describe('todo-list component', () => {
  var component: TodoList;

  beforeEach(() => {
    component = new TodoList();
  });
  
  it('should be defined', () => {
    should.exist(component);
    component.todos.length.should.equal(3);
  });
  
  it('should add a todo', () => {
    component.todos.length.should.equal(3);
    component.addTodo('test');
    component.todos.length.should.equal(4);
    component.todos.pop().should.equal('test');
  });  
});