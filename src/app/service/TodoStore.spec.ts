/// <reference path="../../_all.ts" />

import {TodoModel, TodoFactory, TodoStore} from './TodoStore';

describe('Todo Store', () => {
  describe('Todo Model', () => {
    var model: TodoModel;
    
    afterEach(() => {
      model = null;
    });
    
    it('should be defined', () => {
      model = new TodoModel(1, 'Get things done.', false, false);
      model.should.be.ok;
      model.key.should.equal(1);
      model.title.should.equal('Get things done.');
      model.completed.should.equal(false);
    });
  });

  describe('Todo Factory', () => {
    var factory: TodoFactory;
    
    afterEach(() => {
      factory = null;
    });
    
    it('should be defined', () => {
      factory = new TodoFactory();
      factory.should.be.ok;
      factory.uid.should.equal(0);
    });
    
    it('should get the next uid', () => {
      factory = new TodoFactory();
      factory.uid.should.equal(0);
      
      factory.nextUid().should.equal(1);
      factory.uid.should.equal(1);
    });
    
    it('should create a todo', () => {
      factory = new TodoFactory();
      factory.uid.should.equal(0);
      var todo: TodoModel = factory.createTodo('Get things done.', false, false);
      todo.should.be.ok;
      todo.key.should.equal(1);
      todo.title.should.equal('Get things done.');
      todo.completed.should.equal(false);
    });
  });
  
  describe('Todo Store', () => {
    var store: TodoStore,
        todo: TodoModel;
    
    afterEach(() => {
      store = null;
    });
    
    it('should be defined', () => {
      store = new TodoStore();
      store.should.be.ok;
      store.list.length.should.equal(0);
    });
    
    it('should add a todo', () => {
      store = new TodoStore();
      todo = new TodoModel(1, 'Get things done.', false, false);
      
      store.add(todo);
      store.list.length.should.equal(1);
      store.list[0].should.equal(todo);
    });
    
    it('should get the index of a todo', () => {
      store = new TodoStore();
      todo = new TodoModel(1, 'Get things done.', false, false);
  
      store.add(todo);
      store.indexFor(todo).should.equal(0);
    });
    
    it('should splice out a todo', () => {
      store = new TodoStore();
      todo = new TodoModel(1, 'Get things done.', false, false);
      
      store.add(todo);
      store.spliceOut(todo).should.equal(todo);   
      store.list.length.should.equal(0);
      (store.spliceOut(todo) === null).should.be.ok;   
    });
    
    it('should remove a todo', () => {
      store = new TodoStore();
      todo = new TodoModel(1, 'Get things done.', false, false);
      
      store.list.length.should.equal(0);
      store.add(todo);
      store.list.length.should.equal(1);
      store.remove(todo);   
      store.list.length.should.equal(0);
    });
    
    it('should get the remaining todos', () => {
      store = new TodoStore();
      var todo1 = new TodoModel(1, 'Get things done 1.', false, false),
          todo2 = new TodoModel(1, 'Get things done 2.', true, false),
          todo3 = new TodoModel(1, 'Get things done 3.', true, false),
          todo4 = new TodoModel(1, 'Get things done 4.', false, false),
          todo5 = new TodoModel(1, 'Get things done 5.', false, false);
          
      store.list = [todo1, todo2, todo3, todo4, todo5];
      
      var todosRemaining = store.getRemainingTodos();
      
      todosRemaining.length.should.equal(3);
      todosRemaining.indexOf(todo1).should.not.equal(-1);
      todosRemaining.indexOf(todo2).should.equal(-1);
      todosRemaining.indexOf(todo3).should.equal(-1);
      todosRemaining.indexOf(todo4).should.not.equal(-1);
      todosRemaining.indexOf(todo5).should.not.equal(-1);
    });
    
    it('should remove using a filter', () => {
      store = new TodoStore();
      var todo1 = new TodoModel(1, 'Get things done 1.', false, false),
          todo2 = new TodoModel(1, 'Get things done 2.', true, false),
          todo3 = new TodoModel(1, 'Get things done 3.', true, false),
          todo4 = new TodoModel(1, 'Get things done 4.', false, false),
          todo5 = new TodoModel(1, 'Get things done 5.', false, false);
          
      store.list = [todo1, todo2, todo3, todo4, todo5];
      
      store.removeBy(todo => !todo.completed);
      
      store.list.length.should.be.equal(3);
      store.list.indexOf(todo1).should.not.equal(-1);
      store.list.indexOf(todo2).should.equal(-1);
      store.list.indexOf(todo3).should.equal(-1);
      store.list.indexOf(todo4).should.not.equal(-1);
      store.list.indexOf(todo5).should.not.equal(-1);
    });
    
    it('should apply a function on each todo', () => {
      store = new TodoStore();
      var todo1 = new TodoModel(1, 'Get things done 1.', false, false),
          todo2 = new TodoModel(1, 'Get things done 2.', true, false),
          todo3 = new TodoModel(1, 'Get things done 3.', true, false),
          todo4 = new TodoModel(1, 'Get things done 4.', false, false),
          todo5 = new TodoModel(1, 'Get things done 5.', false, false);
          
      store.list = [todo1, todo2, todo3, todo4, todo5];
      
      store.forEachTodo(t => {
        t.title = '';
      });
      
      todo1.title.should.be.equal('');
      todo2.title.should.be.equal('');
      todo3.title.should.be.equal('');
      todo4.title.should.be.equal('');
      todo5.title.should.be.equal('');
    });
  });
});
