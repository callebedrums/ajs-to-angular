import { AjsDependencies } from './decorators';
import { Router } from '@angular/router';

@AjsDependencies(['$urlServiceProvider', 'RouterProvider'])
export class UIRouterIntegrationConfig {
  constructor($urlServiceProvider: any, RouterProvider: any) {
    $urlServiceProvider.rules.otherwise(
      (matchValue: any, urlParts: any, router: any) => {
        const angularRouter = RouterProvider.$get() as Router;
        const url = angularRouter.parseUrl(router.locationService.url());

        angularRouter.navigate([url]);
      }
    );
  }
}
