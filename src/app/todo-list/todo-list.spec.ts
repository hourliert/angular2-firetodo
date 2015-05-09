import {TodoList} from './todo-list';
import {TodoStore, TodoFactory, Todo} from '../services/todo-store';
import {TodoDisplayType} from "../interfaces/todo-filter";

describe('Todo List Component', () => {
  var component: TodoList,
      storeMock = {
        add: function() {},
        remove: function() {},
        save: function() {},
        removeBy: function() {},
        forEachTodo: function() {}
      },
      factoryMock = {
        createTodo: function() {}
      };

  beforeEach(() => {
    component = new TodoList(<any> storeMock, <any> factoryMock);
    component.should.be.ok;
    component.todoStore.should.be.ok;
    component.todoFactory.should.be.ok;
  });
  afterEach(() => {
    component = null;
  });

  
  it('should handle a new todo', () => {  
    var storeSpy = sinon.spy(component.todoStore, 'add'),
        factorySpy = sinon.spy(component.todoFactory, 'createTodo');
    
    component.onNewTodo('Get things done.');
    
    storeSpy.calledOnce.should.be.ok;
    factorySpy.calledOnce.should.be.ok;
    factorySpy.calledWith('Get things done.', false, false).should.be.ok;
  });
  
  it('should delete a todo', () => {
    var storeSpy = sinon.spy(component.todoStore, 'remove'),
        todo = {
          key: '1234',
          title: 'Walk the dog.',
          completed: false,
          hidden: false
        };
    
    component.deleteTodo(<any> todo);
    
    storeSpy.calledOnce.should.be.ok;
    storeSpy.calledWith(todo).should.be.ok;
  });
  
  it('should select an existing todo to edit', () => { 
    var todo = {
      key: '1234',
      title: 'Walk the dog.',
      completed: false,
      hidden: false
    };
    
    (component.todoEdit === undefined).should.be.ok;
    component.editTodo(<any> todo);
    component.todoEdit.should.be.equal(todo);
  });
  
  it('should finish todo editing', () => {
    var event = <any> {
          which: 100,
          target: {
            value: 'Get things done.'
          }
        },
        todo = {
          key: '1234',
          title: 'Walk the dog.',
          completed: false,
          hidden: false
        };
        
    component.todoEdit = <any> todo;
    component.finishEditing(event, <any> todo);
    
    event.target.value = 'Walk the dog.';
    event.which = 13;
    
    component.finishEditing(event, <any> todo);
    todo.title.should.equal('Walk the dog.');
    (component.todoEdit === null).should.be.ok;
    
    component.todoEdit = <any> todo;
    event.target.value = 'Get things done.';
    event.which = 27;
    
    component.finishEditing(event, <any> todo);
    event.target.value.should.equal('Walk the dog.');
    (component.todoEdit === null).should.be.ok;
  });
  
  it('should toggle the completed status of a todo', () => {
    var storeSpy = sinon.spy(component.todoStore, 'save'),
        todo = {
          key: '1234',
          title: 'Walk the dog.',
          completed: false,
          hidden: false
        };
    
    component.toggleCompleteTodo(<any> todo);
    todo.completed.should.be.ok;
    
    component.toggleCompleteTodo(<any>  todo);
    todo.completed.should.not.be.ok;
    
    storeSpy.calledTwice.should.be.ok;
  });
  
  it('should toggle the completed status of all todos', () => {
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
      
    component.todoStore.list = [<any> todo1,<any> todo2,<any> todo3,<any> todo4,<any> todo5];
        
    component.toggleAllTodo(<any> {
      target: {
        checked: true
      }
    });
    todo1.completed.should.be.ok;
    todo2.completed.should.be.ok;
    todo3.completed.should.be.ok;
    todo4.completed.should.be.ok;
    todo5.completed.should.be.ok;
    
    component.toggleAllTodo(<any> {
      target: {
        checked: false
      }
    });
    todo1.completed.should.not.be.ok;
    todo2.completed.should.not.be.ok;
    todo3.completed.should.not.be.ok;
    todo4.completed.should.not.be.ok;
    todo5.completed.should.not.be.ok;
  });
  
  it('should clear completed todo', () => {
    var spy = sinon.spy(component.todoStore, "removeBy");
    
    component.clearCompleted();
    
    spy.calledOnce.should.be.ok;
  });
  
  it('should filter todos', () => {
    var todo1 = {
          key: '1234',
          title: 'Walk the dog. 1',
          completed: true,
          hidden: false
        },
        todo2 = {
          key: '1234',
          title: 'Walk the dog. 2',
          completed: false,
          hidden: false
        },
        todo3 = {
          key: '1234',
          title: 'Walk the dog. 3',
          completed: true,
          hidden: false
        };
    
    component.todoStore.list = [<any> todo1,<any> todo2,<any> todo3];
    
    var spy = sinon.spy(component.todoStore, "forEachTodo");
    
    component.onNewFilter(TodoDisplayType.all);  
    component.onNewFilter(TodoDisplayType.active);
    component.onNewFilter(TodoDisplayType.completed);
    
    spy.calledThrice.should.be.ok;
  });
});