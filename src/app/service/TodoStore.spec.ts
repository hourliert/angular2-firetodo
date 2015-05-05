import {KeyModel, TodoModel, TodoFactory, Store} from './TodoStore';

describe('Key Model', () => {
  var model: KeyModel;
  
  afterEach(() => {
    model = null;
  });
  
  it('should be defined', () => {
    model = new KeyModel(1);
    should.exist(model);
    model.key.should.equal(1);
  });
});

describe('Todo Model', () => {
  var model: TodoModel;
  
  afterEach(() => {
    model = null;
  });
  
  it('should be defined', () => {
    model = new TodoModel(1, 'Get things done.', false);
    should.exist(model);
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
    should.exist(factory);
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
    var todo: TodoModel = factory.createTodo('Get things done.', false);
    should.exist(todo);
    todo.key.should.equal(1);
    todo.title.should.equal('Get things done.');
    todo.completed.should.equal(false);
  });
});

describe('Todo Store', () => {
  var store: Store<TodoModel>,
      todo: TodoModel;
  
  afterEach(() => {
    store = null;
  });
  
  it('should be defined', () => {
    store = new Store<TodoModel>();
    should.exist(store);
    store.list.length.should.equal(0);
  });
  
  it('should add a todo', () => {
    store = new Store<TodoModel>();
    todo = new TodoModel(1, 'Get things done.', false);
    
    store.add(todo);
    store.list.length.should.equal(1);
    store.list[0].should.equal(todo);
  });
  
  it('should get the index of a todo', () => {
    store = new Store<TodoModel>();
    todo = new TodoModel(1, 'Get things done.', false);

    store.add(todo);
    store.indexFor(todo).should.equal(0);
  });
  
  it('should splice out a todo', () => {
    store = new Store<TodoModel>();
    todo = new TodoModel(1, 'Get things done.', false);
    
    store.add(todo);
    store.spliceOut(todo).should.equal(todo);   
    store.list.length.should.equal(0);
    should.not.exist(store.spliceOut(todo));   
  });
  
  it('should remove a todo', () => {
    store = new Store<TodoModel>();
    todo = new TodoModel(1, 'Get things done.', false);
    
    store.list.length.should.equal(0);
    store.add(todo);
    store.list.length.should.equal(1);
    store.remove(todo);   
    store.list.length.should.equal(0);
  });
});
