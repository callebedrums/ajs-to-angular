import * as $angular from 'angular'; const angular = $angular;

/**
 *
 * definition = {
 *  declarations: Components[],
 *  imports: Modules[],
 *  providers: Services[]
 *  }
 *
 * @Module({
 *  declarations: [
 *      MyComponent // MyComponent is anotated with @ Component
 *  ],
 *  providers: [
 *      MyService // MyService is anotated with @ Dependencies
 *  ],
 *  imports: [
 *      OtherModles // other AngularJs Modules || AngularJs Module's names
 *  ]
 * })
 */

interface Definition {
  declarations?: any[];
  providers?: any[];
  imports?: any[];
  configs?: any[];
}

export function AjsModule(definition: Definition): (moduleConstructor: any) => void {
  return (moduleConstructor: any) => {
    const name = moduleConstructor.name;
    const dependencies = (definition.imports || []).map(m => m.name || m.toString());
    const providers = definition.providers || [];
    const declarations = definition.declarations || [];
    const configs = definition.configs || [];

    const ajsModule = angular.module(name, dependencies);

    for (const service of providers) {
      ajsModule.service(service.name, service);
    }

    for (const declaration of declarations) {

      if (declaration.component) {
        ajsModule.component(declaration.descriptor.name, declaration.descriptor);
      }

      if (declaration.controller) {
        ajsModule.controller(declaration.name, declaration);
      }

      if (declaration.directive) {
        ajsModule.directive(declaration.descriptor.name, () => declaration.descriptor);
      }

    }

    for (const config of configs) {
      ajsModule.config(config);
    }

    moduleConstructor.module = ajsModule;
  };
}
