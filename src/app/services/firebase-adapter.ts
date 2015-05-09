/// <reference path="../../_all.ts" />

import {Injectable} from 'angular2/di';

import {ITodo} from "../interfaces/todo";

import "firebase";


export interface IFirebaseAddObserver {
  notifyTodoAdded(key: string, value: ITodo): void;
}
export interface IFirebaseRemoveObserver {
  notifyTodoRemoved(key: string, value: ITodo): void;
}
export interface IFirebaseChangeObserver {
  notifyTodoChanged(key: string, value: ITodo): void;
}

@Injectable()
export class FirebaseAdapter {
  todosRef: Firebase;
  changeObservers: IFirebaseChangeObserver[];
  removeObservers: IFirebaseRemoveObserver[];
  addObservers: IFirebaseAddObserver[];
  
  constructor() {
    this.todosRef = new Firebase('https://angular2-todo.firebaseio.com/todos');
    this.changeObservers = [];
    this.removeObservers = [];
    this.addObservers = [];
      
    this.todosRef.on("child_added", (snapshot) => {
      let todoValue = snapshot.val(),
          todoKey = snapshot.key();
      this.todoAdded(todoKey, todoValue);
    });
    this.todosRef.on("child_removed", (snapshot) => {
      let todoValue = snapshot.val(),
          todoKey = snapshot.key();
      this.todoRemoved(todoKey, todoValue);
    });
    this.todosRef.on("child_changed", (snapshot) => {
      let todoValue = snapshot.val(),
          todoKey = snapshot.key();
      this.todoChanged(todoKey, todoValue);
    });
  }
  
  registerForTodoAdding(observer: IFirebaseAddObserver) {
    this.addObservers.push(observer);
  }
  registerForTodoRemoving(observer: IFirebaseRemoveObserver) {
    this.removeObservers.push(observer);
  }
  registerForTodoChanging(observer: IFirebaseChangeObserver) {
    this.changeObservers.push(observer);
  }
  
  todoAdded(key: string, value: ITodo) {
    for (let observer of this.addObservers) {
	  	observer.notifyTodoAdded(key, value);
    }
  }
  todoRemoved(key: string, value: ITodo) {
    for (let observer of this.removeObservers) {
	  	observer.notifyTodoRemoved(key, value);
    }
  }
  todoChanged(key: string, value: ITodo) {
    for (let observer of this.changeObservers) {
	  	observer.notifyTodoChanged(key, value);
    }
  }
  
  pushNewTodo(model: ITodo): string {
    let newTodo = this.todosRef.push(model),
        key = newTodo.key();
    return key;
  }
  
  updateTodo(key: string, model: ITodo) {
    this.todosRef.child(key).update(model);
  }
  
  deleteTodo(key: string) {
    this.todosRef.child(key).remove();
  }
}