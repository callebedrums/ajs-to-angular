import '@uirouter/angularjs';

import { Router } from '@angular/router';
import { downgradeInjectable } from '@angular/upgrade/static';

import {
  AjsModule,
  RouterLinkDirective,
  UIRouterIntegrationConfig
} from '../';

class RouteIntegrationModule { };
AjsModule({
  declarations: [
    RouterLinkDirective
  ],
  imports: [
    'ui.router'
  ],
  configs: [
    UIRouterIntegrationConfig
  ]
})(RouteIntegrationModule);

// get the angularjs module definition
const routeIntModule = RouteIntegrationModule.module;

// downgrading Router to be used in the AngularJS application by the RouterLinkDirective
routeIntModule.factory(Router.name, downgradeInjectable(Router));

export { RouteIntegrationModule };
