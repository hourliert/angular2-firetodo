import {TodoList} from './todo-list';
import {Store, TodoFactory, TodoModel} from '../service/TodoStore';

class TodoMock extends TodoModel {
  constructor(title: string, completed: boolean) {
    super(1, title, completed);
  }
}
class StoreMock<T> extends Store<T> {
  constructor() {
    super();
  }
  add(todo: T) {
    this.list = [todo];
  }
}
class TodoFactoryMock extends TodoFactory {
  constructor() {
    super();
  }
  createTodo(title: string, completed: boolean): TodoMock {
    return new TodoMock(title, completed);
  }
}


describe('Todo List Component', () => {
  var component: TodoList;

  afterEach(() => {
    component = null;
  });
  
  it('should be defined', () => {
    component = new TodoList(new StoreMock<TodoModel>(), new TodoFactoryMock());
    component.should.be.ok;
    component.todosStore.should.be.ok;
    component.todosFactory.should.be.ok;
  });
  
  it('should handle a new todo', () => {
    component = new TodoList(new StoreMock<TodoModel>(), new TodoFactoryMock());
    
    component.onNewTodo('Get things done.');
    component.todosStore.list.length.should.equal(1);
    component.todosStore.list[0].title.should.equal('Get things done.');
  });
  
  it.skip('should delete a todo', () => {
    component = new TodoList(new StoreMock<TodoModel>(), new TodoFactoryMock());
    
    var todo = new TodoMock('Get things done.', false);
    component.delete(todo);
  });
});