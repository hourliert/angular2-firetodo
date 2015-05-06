interface List<T> extends Array<T> {
}
interface Type {}

declare module "angular2/angular2" {
  function bootstrap(appComponentType: any): void;
  function Component({
    selector,
    properties,
    hostListeners,
    injectables,
    lifecycle,
    changeDetection
    }:{
      selector:string,
      properties?:Object,
      hostListeners?:Object,
      injectables?:List<any>,
      lifecycle?:List<any>,
      changeDetection?:string
    });

  function View({
      templateUrl,
      template,
      directives,
      formatters,
      source,
      locale,
      device
    }: {
      templateUrl?: string,
      template?: string,
      directives?: List<Type>,
      formatters?: List<Type>,
      source?: List<any>,
      locale?: string,
      device?: string
    });
  function For();
  function If();
  
  class EventEmitter {
    next(...rest: any[]): any;
  }
}

declare module 'angular2/src/di/annotations_impl' {
  function Injectable(): any;
}

declare module "angular2/src/facade/collection" {
  class ListWrapper{
    static push(...rest: any[]): any;
    static splice(...rest: any[]): any;
  }
}