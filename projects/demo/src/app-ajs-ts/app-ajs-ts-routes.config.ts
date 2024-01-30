import { AjsDependencies } from 'ajs-to-angular';

@AjsDependencies(['$stateProvider'])
export class AppAJSRoutesConfig {
  constructor($stateProvider: any) {
    $stateProvider
      .state('ajs-ts', {
        url: '',
        component: 'appAjsTs',
      })
      .state('ajs-ts.child', {
        url: '/child',
        component: 'child',
      });
  }
}
