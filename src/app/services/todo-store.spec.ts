/// <reference path="../../_all.ts" />

import {Todo, TodoFactory, TodoStore} from './todo-store';

describe('Todo Store', () => {
  describe('Todo Model', () => {
    var todo: Todo;
    
    beforeEach(() => {
      todo = new Todo('1', 'Get things done.', false, false);
      todo.should.be.ok;
      todo.key.should.equal('1');
      todo.title.should.equal('Get things done.');
      todo.completed.should.be.false;
      todo.hidden.should.be.false;
    });
    afterEach(() => {
      todo = null;
    });
    
    it('shoud get the model', () => {
      todo.model.completed.should.be.false;
      todo.model.hidden.should.be.false;
      todo.model.title.should.equal('Get things done.');
    });
    it('shoud set the model', () => {
      todo.model = {
        title: 'Walk the frog.',
        completed: true,
        hidden: true
      };
      todo.model.completed.should.be.true;
      todo.model.hidden.should.be.true;
      todo.model.title.should.equal('Walk the frog.');
    });
  });

  describe('Todo Factory', () => {
    var factory: TodoFactory;
    
    beforeEach(() => {
      factory = new TodoFactory();
      factory.should.be.ok;
    });
    afterEach(() => {
      factory = null;
    });

    it('should create a todo', () => {
      var todo = factory.createTodo('Get things done.', false, false);
      todo.should.be.ok;
      todo.title.should.equal('Get things done.');
      todo.completed.should.be.false;
      todo.hidden.should.be.false;
    });
  });
  
  describe('Todo Store', () => {
    var store: TodoStore,
        sandbox,
        fbAdapterMock = {
          registerForTodoAdding: function() {},
          registerForTodoRemoving: function() {},
          registerForTodoChanging: function() {},
          pushNewTodo: function() {},
          deleteTodo: function() {},
          updateTodo: function() {}
        };
    
    beforeEach(() => {
      var spy1 = sinon.spy(fbAdapterMock, 'registerForTodoAdding'),
          spy2 = sinon.spy(fbAdapterMock, 'registerForTodoRemoving'),
          spy3 = sinon.spy(fbAdapterMock, 'registerForTodoChanging');
      
      store = new TodoStore(<any> fbAdapterMock);
      store.should.be.ok;
      store.list.length.should.equal(0);
      store.fbAdapter.should.be.ok;
      
      spy1.called.should.be.ok;
      spy2.called.should.be.ok;
      spy3.called.should.be.ok;
      spy1.restore();
      spy2.restore();
      spy3.restore();
      
      sandbox = sinon.sandbox.create();
    });
    afterEach(() => {
      sandbox.restore();
      store = null;
    });
    
    it('should handle when a new todo arrived', () => {
      var spy = sinon.spy(Todo);
      
      store.notifyTodoAdded('1234', { 
        title: 'Get things done.',
        completed: false,
        hidden: false
      });
      
      store.list.length.should.equal(1);
      store.list[0].completed.should.be.false;
      store.list[0].title.should.equal('Get things done.');
      store.list[0].hidden.should.be.false;
    });
    
    it('should handle when a todo has changed', () => {
      var spy = sinon.spy(store, "findByKey");
      
      var todo = {
        key: '1234',
        title: 'Walk the dog.',
        completed: false,
        hidden: false
      };
      Object.defineProperty(todo, "model", {
        set: function (model) {
            this.title = model.title;
            this.completed = model.completed;
            this.hidden = model.hidden;
        },
        enumerable: true,
        configurable: true
      });
    
      store.list = [<any> todo];
       
      store.notifyTodoChanged('1234', { 
        title: 'Get things done.',
        completed: false,
        hidden: true
      });
      spy.calledWith('1234').should.be.ok;
      
      todo.title.should.equal('Get things done.');
      todo.completed.should.be.false;
      todo.hidden.should.be.true;
    });
    
    it('should handle when a todo has been removed', () => {
      var spy = sinon.spy(store, "findByKey"),
          spy2 = sinon.spy(store, 'spliceOut');
      
      var todo = {
        key: '1234',
        title: 'Walk the dog.',
        completed: false,
        hidden: false
      };
    
      store.list = [<any> todo];
       
      store.notifyTodoRemoved('1234', { 
        title: 'Walk the dog.',
        completed: false,
        hidden: false
      });
      spy.calledWith('1234').should.be.ok;
      spy2.calledWith(todo).should.be.ok;
      
      store.list.length.should.be.equal(0);
    });
    
    it('should add a todo', () => {
      var spy = sinon.spy(fbAdapterMock, 'pushNewTodo');
      
      var todo = {
        key: '1234',
        model: {
          title: 'Walk the dog.',
          completed: false,
          hidden: false
        }
      };
      
      store.add(<any> todo);
      spy.calledWith(todo.model).should.be.ok; 
    });
    
    it('should remove a todo', () => {
      var spy = sinon.spy(fbAdapterMock, 'deleteTodo');
      
      var todo = {
        key: '1234',
        model: {
          title: 'Walk the dog.',
          completed: false,
          hidden: false
        }
      };
      
      store.remove(<any> todo);
      spy.calledWith(todo.key).should.be.ok; 
    });
    
    it('should update a todo', () => {
      var spy = sinon.spy(fbAdapterMock, 'updateTodo');
      
      var todo = {
        key: '1234',
        model: {
          title: 'Walk the dog.',
          completed: false,
          hidden: false
        }
      };
      
      store.save(<any> todo);
      spy.calledWith(todo.key, todo.model).should.be.ok; 
    });
    
    it('should get the remaining todos', () => {
      var todo1 = {
            key: '1234',
            title: 'Walk the dog. 1',
            completed: false,
            hidden: false
          },
          todo2 = {
            key: '1234',
            title: 'Walk the dog. 2',
            completed: true,
            hidden: false
          },
          todo3 = {
            key: '1234',
            title: 'Walk the dog. 3',
            completed: true,
            hidden: false
          },
          todo4 = {
            key: '1234',
            title: 'Walk the dog. 4',
            completed: false,
            hidden: false
          },
          todo5 = {
            key: '1234',
            title: 'Walk the dog. 5',
            completed: false,
            hidden: false
          };
              
      store.list = [<any> todo1,<any> todo2,<any> todo3,<any> todo4,<any> todo5];
      
      var todosRemaining = store.getRemainingTodos();
      
      todosRemaining.length.should.equal(3);
      todosRemaining.indexOf(<any> todo1).should.not.equal(-1);
      todosRemaining.indexOf(<any> todo2).should.equal(-1);
      todosRemaining.indexOf(<any> todo3).should.equal(-1);
      todosRemaining.indexOf(<any> todo4).should.not.equal(-1);
      todosRemaining.indexOf(<any> todo5).should.not.equal(-1);
    });
    
    it('should splice out a todo', () => {
      var todo = {
        key: '1234',
        title: 'Walk the dog.',
        completed: false,
        hidden: false
      };
      
      store.list = [<any> todo];
      
      store.spliceOut(<any> todo).should.equal(todo);   
      store.list.length.should.equal(0);
      (store.spliceOut(<any> todo) === null).should.be.ok;   
    });
    
    it('should get the index of a todo', () => {
      var todo = {
        key: '1234',
        title: 'Walk the dog.',
        completed: false,
        hidden: false
      };
  
      store.list = [<any> todo];
      store.indexFor(<any> todo).should.equal(0);
    });
   
    it('should find a todo by key', () => {
      var todo = {
        key: '1234',
        title: 'Walk the dog.',
        completed: false,
        hidden: false
      };
  
      store.list = [<any> todo];
      store.findByKey('1234').should.equal(todo);
    });
   
    it('should remove using a filter', () => {
      var todo1 = {
            key: '1234',
            title: 'Walk the dog. 1',
            completed: false,
            hidden: false
          },
          todo2 = {
            key: '1234',
            title: 'Walk the dog. 2',
            completed: true,
            hidden: false
          },
          todo3 = {
            key: '1234',
            title: 'Walk the dog. 3',
            completed: true,
            hidden: false
          },
          todo4 = {
            key: '1234',
            title: 'Walk the dog. 4',
            completed: false,
            hidden: false
          },
          todo5 = {
            key: '1234',
            title: 'Walk the dog. 5',
            completed: false,
            hidden: false
          };          
      var spy = sinon.spy(store, 'remove'); 
        
      store.list = [<any> todo1,<any> todo2,<any> todo3,<any> todo4,<any> todo5];
      
      
      store.removeBy(todo => todo.completed);
      spy.calledTwice.should.be.ok;
    });
    
    it('should apply a function on each todo', () => {
      var todo1 = {
            key: '1234',
            title: 'Walk the dog. 1',
            completed: false,
            hidden: false
          },
          todo2 = {
            key: '1234',
            title: 'Walk the dog. 2',
            completed: true,
            hidden: false
          },
          todo3 = {
            key: '1234',
            title: 'Walk the dog. 3',
            completed: true,
            hidden: false
          },
          todo4 = {
            key: '1234',
            title: 'Walk the dog. 4',
            completed: false,
            hidden: false
          },
          todo5 = {
            key: '1234',
            title: 'Walk the dog. 5',
            completed: false,
            hidden: false
          };   
          
      store.list = [<any> todo1,<any> todo2,<any> todo3,<any> todo4,<any> todo5];
      
      store.forEachTodo(t => {
        t.title = '';
      });
      
      todo1.title.should.be.equal('');
      todo2.title.should.be.equal('');
      todo3.title.should.be.equal('');
      todo4.title.should.be.equal('');
      todo5.title.should.be.equal('');
      
      store.forEachTodo(t => {
        t.hidden = !t.completed;
      });
      
      todo1.hidden.should.be.true;
      todo2.hidden.should.be.false;
      todo3.hidden.should.be.false;
      todo4.hidden.should.be.true;
      todo5.hidden.should.be.true;
    });
  });
});
