import { AjsDependencies } from 'projects/ajs-to-angular/src/public-api';

@AjsDependencies(['$stateProvider'])
export class AppAJSRoutesConfig {
  constructor($stateProvider) {

    $stateProvider.state('ajs-ts', {
      url: '',
      component: 'appAjsTs'
    }).state('ajs-ts.child', {
      url: '/child',
      component: 'child'
    });

  }
}
