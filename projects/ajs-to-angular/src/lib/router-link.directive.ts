import { AjsDirective } from './decorators';
import { Router } from '@angular/router';

@AjsDirective({
  restrict: 'A',
  scope: {
    routerLink: '@'
  },
  dependencies: ['$scope', '$element', Router]
})
export class RouterLinkDirective {

  navigate = () => {
    this.router.navigate([this.$scope.routerLink]);
  }

  constructor(
    private $scope,
    private $element,
    private router: Router
  ) {
    this.$element.on('click', this.navigate);

    this.$scope.$on('$destroy', () => {
      this.$element.off('click', this.navigate);
    });
  }
}
