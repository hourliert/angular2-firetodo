import {TodoInput} from './todo-input';
import {TodoStore, TodoFactory, Todo} from '../services/todo-store';

describe('Todo Input Component', () => {
  var component: TodoInput;

  beforeEach(() => {
    component = new TodoInput();
    component.should.be.ok;
    component.newtodo.should.be.ok;
  });
  afterEach(() => {
    component = null;
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