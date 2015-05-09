/// <reference path="../../_all.ts" />

import {Injectable, Inject} from 'angular2/di';
import {FirebaseAdapter, IFirebaseAddObserver, IFirebaseRemoveObserver, IFirebaseChangeObserver} from "./firebase-adapter";
import {ITodo} from "../interfaces/todo";

export class Todo implements ITodo {
  private _key: string;
  title: string;
  completed: boolean;
  hidden: boolean;

  constructor(
    key: string, 
    title: string, 
    completed: boolean, 
    hidden: boolean
  ) {
    this._key = key;
    this.title = title;
    this.completed = completed;
    this.hidden = hidden;
  }
  
  set key(key: string) {
    this._key = key;
  }
  get key() {
    return this._key;
  }
  
  set model(model: ITodo) {
    this.title = model.title;
    this.completed = model.completed;
    this.hidden = model.hidden;
  }
  get model(): ITodo {
    let title = this.title,
        completed = this.completed,
        hidden = this.hidden;
    return { title, completed, hidden };
  }
}

@Injectable()
export class TodoFactory {
  createTodo(title: string, completed: boolean, hidden: boolean): Todo {
    return new Todo(null, title, completed, hidden);
  }
}

@Injectable()
export class TodoStore implements IFirebaseChangeObserver, IFirebaseAddObserver, IFirebaseRemoveObserver {
  list: List<Todo>;
  fbAdapter: FirebaseAdapter;
  loading: boolean;

  constructor(
    @Inject(FirebaseAdapter) fb: FirebaseAdapter
  ) {
    this.list = [];
    this.loading = true;
    
    this.fbAdapter = fb;
    
    this.fbAdapter.registerForTodoAdding(this);
    this.fbAdapter.registerForTodoRemoving(this);
    this.fbAdapter.registerForTodoChanging(this);
  }
  
  isLoading(): boolean {
    return this.loading;
  }
  
  notifyTodoAdded(key: string, value: ITodo) {
    this.loading = false;
    this.list.push(new Todo(key, value.title, value.completed, value.hidden));
  }
  notifyTodoChanged(key: string, value: ITodo) {
    let todo = this.findByKey(key);   
    todo.model = value;
  }
  notifyTodoRemoved(key: string, value: ITodo) {
    let todo = this.findByKey(key);
    this.spliceOut(todo);
  }
  
  add(item: Todo) {
    item.key = this.fbAdapter.pushNewTodo(item.model);
  }
  remove(item: Todo) {
    this.fbAdapter.deleteTodo(item.key);
  }
  save(item: Todo) {
    this.fbAdapter.updateTodo(item.key, item.model);
  }
  
  getRemainingTodos(): List<Todo> {
    return this.list.filter((todo: Todo) => {
      return !todo.completed;
    });
  }
  
  spliceOut(item: Todo) {
    let index = this.indexFor(item);
    if (index > -1) {
      return this.list.splice(index, 1)[0];
    }
    return null;
  }
  
  indexFor(item: Todo): number {
    return this.list.indexOf(item);
  }
  
  findByKey(key: string): Todo {
    for (let todo of this.list) {
      if (todo.key === key) return todo;
    }
  }
  
  removeBy(filter: any) {
    let listCopy = this.list.slice();
    
    for (let todo of listCopy) {
      if (filter(todo)) {
        this.remove(todo);
      }
    }
  }
  
  forEachTodo(action: any) {
    this.list.forEach(action);
  }
}