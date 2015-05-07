/// <reference path="../_all.ts" />

import {bootstrap} from "angular2/angular2";
import {reflector} from 'angular2/src/reflection/reflection';
import {ReflectionCapabilities} from 'angular2/src/reflection/reflection_capabilities';
import {TodoApp} from "./app";

reflector.reflectionCapabilities = new ReflectionCapabilities();
bootstrap(TodoApp);
