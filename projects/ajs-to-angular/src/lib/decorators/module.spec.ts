import * as angular from 'angular';
import { AjsModule } from './module';

describe('Module decorator test suite::', () => {

  const $inject: string[] = null;

  it('should define a decorator factory and return a function', () => {
    const decorator = AjsModule({});
    expect(typeof decorator).toEqual('function');
  });

  describe('decorator', () => {
    let moduleObj;
    let constructor: any;

    beforeEach(() => {
      constructor = { name: 'MyModule' };
      moduleObj = jasmine.createSpyObj('Module', ['service', 'component', 'config', 'controller', 'directive']);
      spyOn(angular, 'module').and.returnValue(moduleObj);
    });

    it('should instanciate a new angular module', () => {
      AjsModule({})(constructor);

      expect(constructor.module).toBe(moduleObj);
      expect(angular.module).toHaveBeenCalledWith('MyModule', jasmine.arrayContaining([]));
    });

    it('should instanciate a new angular module with dependencies', () => {
      AjsModule({
        imports: ['Dep1', { name: 'Dep2' }]
      })(constructor);

      expect(angular.module).toHaveBeenCalledWith('MyModule', jasmine.arrayContaining(['Dep1', 'Dep2']));
    });

    it('should instanciate a new angular module with services', () => {
      const service = {
        name: 'MyService'
      };
      AjsModule({
        providers: [service]
      })(constructor);

      expect(moduleObj.service).toHaveBeenCalledWith('MyService', service);
    });

    it('should instanciate a new angular module with components', () => {
      const component = {
        component: true,
        descriptor: {
          name: 'MyComponent'
        }
      };
      AjsModule({
        declarations: [component]
      })(constructor);

      expect(moduleObj.component).toHaveBeenCalledWith('MyComponent', component.descriptor);
    });

    it('should instanciate a new angular module with controllers', () => {
      const controller = {
        controller: true,
        name: 'MyController'
      };
      AjsModule({
        declarations: [controller]
      })(constructor);

      expect(moduleObj.controller).toHaveBeenCalledWith('MyController', controller);
    });

    it('should instanciate a new angular module with directives', () => {
      const directive = {
        directive: true,
        descriptor: {
          name: 'MyDirective'
        }
      };
      AjsModule({
        declarations: [directive]
      })(constructor);

      expect(moduleObj.directive).toHaveBeenCalledWith('MyDirective', jasmine.any(Function));

      expect(moduleObj.directive.calls.mostRecent().args[1]()).toEqual(directive.descriptor);
    });

    it('should instanciate a new angular module with configuration', () => {
      AjsModule({
        configs: ['MyConfig']
      })(constructor);

      expect(moduleObj.config).toHaveBeenCalledWith('MyConfig');
    });

  });
});
