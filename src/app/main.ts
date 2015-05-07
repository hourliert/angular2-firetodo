/// <reference path="../_all.ts" />

import {bootstrap} from "angular2/angular2";
//import {Injector} from "angular2/di";
//import {reflector} from 'angular2/src/reflection/reflection';
//import {ReflectionCapabilities} from 'angular2/src/reflection/reflection_capabilities';

import {TodoApp} from "./app";
//import {TodoStore, TodoFactory} from "./service/TodoStore";

//var injector = Injector.resolveAndCreate([TodoStore, TodoFactory, TodoApp]);
//
//var store = injector.get(TodoStore);
//console.log(store);


//reflector.reflectionCapabilities = new ReflectionCapabilities();
bootstrap(TodoApp);
