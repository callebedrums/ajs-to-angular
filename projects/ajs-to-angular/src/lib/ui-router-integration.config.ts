import { AjsDependencies } from './decorators';
import { Router } from '@angular/router';


@AjsDependencies(['$urlServiceProvider', 'RouterProvider'])
export class UIRouterIntegrationConfig {
  constructor($urlServiceProvider, RouterProvider) {

    $urlServiceProvider.rules.otherwise((matchValue, urlParts, router) => {
      const angularRouter = RouterProvider.$get() as Router;
      const url = angularRouter.parseUrl(router.locationService.url());

      angularRouter.navigate([url]);
    });

  }
}
