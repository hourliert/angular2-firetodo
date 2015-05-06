import {TodoInput} from './todo-input';

describe('Todo Input Component', () => {
  var component: TodoInput;

  afterEach(() => {
    component = null;
  });
  
  it('should be defined', () => {
    component = new TodoInput();
    component.should.be.ok;
    component.todoTitle.should.equal('');
  });
  
  it('should submit a new todo', () => {
    component = new TodoInput();
    
    var spy = sinon.spy(component.newTodo, 'next');
    
    component.submitTodo();
    component.todoTitle = 'Get things done.';
    component.submitTodo();
    
    spy.calledOnce.should.be.ok;
    spy.calledWith('Get things done.').should.be.ok;
  });
  
  it('should update todo model', () => {
    component = new TodoInput();
    component.todoTitle.should.equal('');
    component.update('Get things done.');
    component.todoTitle.should.equal('Get things done.');
  });
});