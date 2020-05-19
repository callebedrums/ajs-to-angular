import { RouterLinkDirective } from './router-link.directive';

describe('RouterLinkDirective', () => {

    let directive: RouterLinkDirective;
    let $scope;
    let $element;
    let router;


    beforeEach(() => {

        $scope = { routerLink: '/my/link', $on: jasmine.createSpy() };
        $element = jasmine.createSpyObj('$element', ['on', 'off']);
        router = jasmine.createSpyObj('Router', ['navigate']);

        directive = new RouterLinkDirective($scope, $element, router);
    });

    it('should be created', () => {
        expect(directive).toBeTruthy();

        expect($element.on).toHaveBeenCalledWith('click', jasmine.any(Function));
        expect($scope.$on).toHaveBeenCalledWith('$destroy', jasmine.any(Function));
    });

    it('should navigate to link when clicked', () => {
        directive.navigate();

        expect(router.navigate).toHaveBeenCalledWith(jasmine.arrayContaining(['/my/link']));
    });

    it('should unregister click listener when destroied', () => {
        $scope.$on.calls.mostRecent().args[1]();

        expect($element.off).toHaveBeenCalledWith('click', jasmine.any(Function));
    });

});
