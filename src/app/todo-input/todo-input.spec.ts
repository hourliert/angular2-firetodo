import {TodoInput} from './todo-input';
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

describe('Todo Input Component', () => {
  var component: TodoInput;

  afterEach(() => {
    component = null;
  });
  
  it('should be defined', () => {
    component = new TodoInput();
    component.should.be.ok;
    component.newtodo.should.be.ok;
  });
  
  it('should handle a user input', () => {
    component = new TodoInput();
    
    var spy = sinon.spy(component, 'submitTodo'),
        event: KeyboardEvent,
        input: HTMLInputElement;
        
    event = <KeyboardEvent> {
      which: 100
    };
    input = <HTMLInputElement> {
      value: 'Get things done.'
    };

    component.update(event, input);
    event.which = 13;
    component.update(event, input);
    
    spy.calledOnce.should.be.ok;
    spy.calledWith('Get things done.').should.be.ok;
  });
  
  it('should submit a new todo', () => {
    component = new TodoInput();
    
    var spy = sinon.spy(component.newtodo, 'next');
    
    component.submitTodo('');
    component.submitTodo('Get things done.');
    
    spy.calledOnce.should.be.ok;
    spy.calledWith('Get things done.').should.be.ok;
  });
});