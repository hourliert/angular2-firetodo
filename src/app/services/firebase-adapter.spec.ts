/// <reference path="../../_all.ts" />

import {FirebaseAdapter} from "./firebase-adapter";

describe('Firebase Adapter', () => {
  var adapter: FirebaseAdapter;
  
  beforeEach(() => {
    adapter = new FirebaseAdapter();
    adapter.should.be.ok;
    adapter.todosRef.should.be.ok;
    adapter.changeObservers.should.be.ok;
    adapter.removeObservers.should.be.ok;
    adapter.addObservers.should.be.ok;
  });
  afterEach(() => {
    adapter = null;
  });
  
  it('should register a observer waiting for a new todo', () => {
    adapter.addObservers.length.should.equal(0);
    adapter.registerForTodoAdding({
      notifyTodoAdded: null,
      notifyTodoChanged: null,
      notifyTodoRemoved: null
    });
    adapter.addObservers.length.should.equal(1);
  });
  it('should register a observer waiting for a removed todo', () => {
    adapter.removeObservers.length.should.equal(0);
    adapter.registerForTodoRemoving({
      notifyTodoAdded: null,
      notifyTodoChanged: null,
      notifyTodoRemoved: null
    });
    adapter.removeObservers.length.should.equal(1);
  });
  it('should register a observer waiting for a changed todo', () => {
    adapter.changeObservers.length.should.equal(0);
    adapter.registerForTodoChanging({
      notifyTodoAdded: null,
      notifyTodoChanged: null,
      notifyTodoRemoved: null
    });
    adapter.changeObservers.length.should.equal(1);
  });
  it('should notify a new todo is arrived', () => {
    var observer = {
      notifyTodoAdded: function() {},
      notifyTodoChanged: null,
      notifyTodoRemoved: null
    };
    
    adapter.addObservers = [observer];
    
    var spy = sinon.spy(observer, "notifyTodoAdded");
    
    var todoModel = {
      title: 'Get things done.',
      completed: false,
      hidden: false
    };
    adapter.todoAdded('1234', todoModel);
    
    spy.calledWith('1234', todoModel).should.be.ok;
  });
  it('should notify a todo has been removed', () => {
    var observer = {
      notifyTodoAdded: null,
      notifyTodoChanged: null,
      notifyTodoRemoved: function() {}
    };
    
    adapter.removeObservers = [observer];
    
    var spy = sinon.spy(observer, "notifyTodoRemoved");
    
    var todoModel = {
      title: 'Get things done.',
      completed: false,
      hidden: false
    };
    adapter.todoRemoved('1234', todoModel);
    
    spy.calledWith('1234', todoModel).should.be.ok;
  });
  it('should notify a todo has changed', () => {
    var observer = {
      notifyTodoAdded: null,
      notifyTodoChanged: function() {},
      notifyTodoRemoved: null
    };
    
    adapter.changeObservers = [observer];
    
    var spy = sinon.spy(observer, "notifyTodoChanged");
    
    var todoModel = {
      title: 'Get things done.',
      completed: false,
      hidden: false
    };
    adapter.todoChanged('1234', todoModel);
    
    spy.calledWith('1234', todoModel).should.be.ok;
  });
  
  it('should save a new todo', () => {
    var todosRef = <any>{
          push: function() {
            return {
              key: function() {
                return '1234';
              }
            };
          }
        },
        todoModel = {
          title: 'Get things done.',
          completed: false,
          hidden: false
        },
        spy = sinon.spy(todosRef, 'push');
        
    adapter.todosRef = todosRef;
    
    adapter.pushNewTodo(todoModel).should.equal('1234');
    spy.calledWith(todoModel).should.be.ok;
  });
  it('should update a todo', () => {
    var childReturn = {
          update: function() {}
        },
        todosRef = <any>{
          child: function() {
            return childReturn;
          }
        },
        todoModel = {
          title: 'Get things done.',
          completed: false,
          hidden: false
        },
        childSpy = sinon.spy(todosRef, 'child'),
        updateSpy = sinon.spy(todosRef.child(), 'update');;
        
    adapter.todosRef = todosRef;
    
    adapter.updateTodo('1234', todoModel);
    childSpy.calledWith('1234').should.be.ok;
    updateSpy.calledWith(todoModel).should.be.ok;
  });
  it('should remove a todo', () => {
    var childReturn = {
          remove: function() {}
        },
        todosRef = <any>{
          child: function() {
            return childReturn;
          }
        },
        childSpy = sinon.spy(todosRef, 'child'),
        removeSpy = sinon.spy(todosRef.child(), 'remove');;
        
    adapter.todosRef = todosRef;
    
    adapter.deleteTodo('1234');
    childSpy.calledWith('1234').should.be.ok;
    removeSpy.called.should.be.ok;
  });
})