/// <reference path="../../_all.ts" />

import {Injectable} from 'angular2/di';

export class KeyModel {
  key: number;
  
  constructor(k: number) {
    this.key = k;
  }
}

export class TodoModel extends KeyModel {
  title: string;
  completed: boolean;

  constructor(key: number, title: string, completed: boolean) {
      super(key);
      this.title = title;
      this.completed = completed;
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
  
  createTodo(title: string, completed: boolean): TodoModel {
    return new TodoModel(this.nextUid(), title, completed);
  }
}

@Injectable()
export class TodoStore {
  list: List<KeyModel>;
  constructor() {
    this.list = [];
  }
  
  add(item: KeyModel) {
    this.list.push(item);
  }
  remove(item: KeyModel) {
    this.spliceOut(item);
  }
  
  spliceOut(item: KeyModel) {
    let index = this.indexFor(item);
    if (index > -1) {
      return this.list.splice(index, 1)[0];
    }
    return null;
  }
  
  indexFor(item: KeyModel): number {
    return this.list.indexOf(item);
  }
}