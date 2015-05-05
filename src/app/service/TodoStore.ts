/// <reference path="../../_all.ts" />

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

export class Store<T> {
  list: List<T>;
  constructor() {
    this.list = [];
  }
  
  add(item: T) {
    this.list.push(item);
  }
  remove(item: T) {
    let index = this.indexFor(item);
    this.list.splice(index, 1);
  }
  
  spliceOut(item: T) {
    let index = this.indexFor(item);
    if (index > -1) {
      return this.list.splice(index, 1)[0];
    }
    return null;
  }
  
  indexFor(item: T): number {
    return this.list.indexOf(item);
  }
}