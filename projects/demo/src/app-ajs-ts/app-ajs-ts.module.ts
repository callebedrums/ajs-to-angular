
import '@uirouter/angularjs';

import { AppAJSTSComponent } from './app-ajs-ts.component';
import {
  AjsModule,
  UIRouterIntegrationConfig,
  RouterLinkDirective
} from 'projects/ajs-to-angular/src/public-api';
import { AppAJSRoutesConfig } from './app-ajs-ts-routes.config';
import { ChildComponent } from './child/child.component';
import { Router } from '@angular/router';
import { downgradeInjectable } from '@angular/upgrade/static';

@AjsModule({
  declarations: [
    AppAJSTSComponent,
    ChildComponent,
    RouterLinkDirective // adding the RouterLink directive implemented by the lib to navigate back to Angular components
  ],
  imports: [
    'ui.router'
  ],
  configs: [
    AppAJSRoutesConfig,
    UIRouterIntegrationConfig // adding UI Router integration implemented by the lib
  ]
})
export class AppAJSTSModule { }

// get the angularjs module definition
const appAJSTSModule: any = (AppAJSTSModule as any).module;

// downgrading Router to be used in the AngularJS application by the RouterLinkDirective
appAJSTSModule.factory(Router.name, downgradeInjectable(Router) as any);


// required to be lazy loaded
export default AppAJSTSModule;


