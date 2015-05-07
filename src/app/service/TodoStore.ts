/// <reference path="../../_all.ts" />

import {Injectable} from 'angular2/di';

export enum TODO_DISPLAY {
  all, active, completed
}

export interface ITodoFilter {
  label: string;
  type: TODO_DISPLAY;
}

export class TodoModel {
  key: number;
  title: string;
  completed: boolean;
  hidden: boolean;

  constructor(key: number, title: string, completed: boolean, hidden: boolean) {
      this.key = key;
      this.title = title;
      this.completed = completed;
      this.hidden = hidden;
  }
}

@Injectable()
export class TodoFactory {
  uid: number;
  constructor() {
    this.uid = 0;
  }
  
  nextUid(): number {
    this.uid++;
    return this.uid;
  }
  
  createTodo(title: string, completed: boolean, hidden: boolean): TodoModel {
    return new TodoModel(this.nextUid(), title, completed, hidden);
  }
}

@Injectable()
export class TodoStore {
  list: List<TodoModel>;
  constructor() {
    this.list = [];
  }
  
  add(item: TodoModel) {
    this.list.push(item);
  }
  remove(item: TodoModel) {
    this.spliceOut(item);
  }
  
  getRemainingTodos(): List<TodoModel> {
    return this.list.filter((todo: TodoModel) => {
      return !todo.completed;
    });
  }
  
  spliceOut(item: TodoModel) {
    let index = this.indexFor(item);
    if (index > -1) {
      return this.list.splice(index, 1)[0];
    }
    return null;
  }
  
  indexFor(item: TodoModel): number {
    return this.list.indexOf(item);
  }
  
  removeBy(filter: any) {
    this.list = this.list.filter(filter);
  }
  
  forEachTodo(action: any) {
    this.list.forEach(action);
  }
}