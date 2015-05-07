import {TodoList} from './todo-list';
import {TodoStore, TodoFactory, TodoModel} from '../service/TodoStore';

class TodoMock extends TodoModel {
  constructor(key: number = 1, title: string = 'Get things done.', completed: boolean = false) {
    super(key, title, completed);
  }
}
class TodoStoreMock extends TodoStore{
  constructor() {
    super();
  }
  add(todo: TodoMock) { 
  }
  remote(todo: TodoMock){
  }
}

class TodoFactoryMock extends TodoFactory {
  constructor() {
    super();
  }
  createTodo(title: string = 'Get things done.', completed: boolean = false): TodoMock {
    return new TodoMock(1, title, completed);
  }
}


describe('Todo List Component', () => {
  var component: TodoList;

  afterEach(() => {
    component = null;
  });
  
  it('should be defined', () => {
    component = new TodoList(new TodoStoreMock(), new TodoFactoryMock());
    component.should.be.ok;
    component.todoStore.should.be.ok;
    component.todoFactory.should.be.ok;
  });
  
  it('should handle a new todo', () => {
    component = new TodoList(new TodoStoreMock(), new TodoFactoryMock());
    
    var storeSpy = sinon.spy(component.todoStore, 'add'),
        factorySpy = sinon.spy(component.todoFactory, 'createTodo');
    
    component.onNewTodo('Get things done.');
    
    storeSpy.calledOnce.should.be.ok;
    factorySpy.calledOnce.should.be.ok;
    factorySpy.calledWith('Get things done.', false).should.be.ok;
  });
  
  it('should delete a todo', () => {
    component = new TodoList(new TodoStoreMock(), new TodoFactoryMock());
    
    var storeSpy = sinon.spy(component.todoStore, 'remove'),
        todo = new TodoMock();
    
    component.deleteTodo(todo);
    
    storeSpy.calledOnce.should.be.ok;
    storeSpy.calledWith(todo).should.be.ok;
  });
  
  it('should select an existing todo to edit', () => {
    component = new TodoList(new TodoStoreMock(), new TodoFactoryMock());
    
    var todo = new TodoMock();
    
    (component.todoEdit === undefined).should.be.ok;
    component.editTodo(todo);
    component.todoEdit.should.be.equal(todo);
  });
  
  it('should finish todo editing', () => {
    component = new TodoList(new TodoStoreMock(), new TodoFactoryMock());
     
    var event = <any> {
          which: 100,
          target: {
            value: 'Get things done.'
          }
        },
        todo = new TodoMock();
        
    component.todoEdit = todo;
    component.finishEditing(event, todo);
    
    event.target.value = 'Walk the dog.';
    event.which = 13;
    
    component.finishEditing(event, todo);
    todo.title.should.equal('Walk the dog.');
    (component.todoEdit === null).should.be.ok;
    
    component.todoEdit = todo;
    event.target.value = 'Get things done.';
    event.which = 27;
    
    component.finishEditing(event, todo);
    event.target.value.should.equal('Walk the dog.');
    (component.todoEdit === null).should.be.ok;
  });
  
  it('should toggle the completed status of a todo', () => {
    component = new TodoList(new TodoStoreMock(), new TodoFactoryMock());
    var todo = new TodoMock();
    
    component.toggleCompleteTodo(todo);
    todo.completed.should.be.ok;
    
    component.toggleCompleteTodo(todo);
    todo.completed.should.not.be.ok;
  });
  
  it('should toggle the completed status of all todos', () => {
    var todo1 = new TodoMock(),
        todo2 = new TodoMock(),
        todo3 = new TodoMock();
        
    component = new TodoList(<any> {
      list: [todo1, todo2, todo3] 
    }, new TodoFactoryMock());
        
    component.toggleAllTodo(<any> {
      target: {
        checked: true
      }
    });
    todo1.completed.should.be.ok;
    todo2.completed.should.be.ok;
    todo3.completed.should.be.ok;
    
    component.toggleAllTodo(<any> {
      target: {
        checked: false
      }
    });
    todo1.completed.should.not.be.ok;
    todo2.completed.should.not.be.ok;
    todo3.completed.should.not.be.ok;
  });
});