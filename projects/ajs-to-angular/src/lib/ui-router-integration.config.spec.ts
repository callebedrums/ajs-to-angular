import { UIRouterIntegrationConfig } from './ui-router-integration.config';


describe('UiRouterIntegrationConfig', () => {

    let config: UIRouterIntegrationConfig;
    let rules;
    let router;
    let locationService;


    beforeEach(() => {
        rules = jasmine.createSpyObj('Rules', ['otherwise']);
        router = jasmine.createSpyObj('Router', ['parseUrl', 'navigate']);
        locationService = jasmine.createSpyObj('LocationService', ['url']);

        router.parseUrl.and.returnValue('/parsed-url');
        locationService.url.and.returnValue('/raw-url');

        config = new UIRouterIntegrationConfig({ rules }, { $get: () => router });
    });

    it('should be created', () => {
        expect(config).toBeTruthy();
        expect(rules.otherwise).toHaveBeenCalledTimes(1);
    });

    it('should navigate to URL', () => {
        rules.otherwise.calls.mostRecent().args[0](null, null, { locationService });

        expect(locationService.url).toHaveBeenCalledTimes(1);
        expect(router.parseUrl).toHaveBeenCalledWith('/raw-url');
        expect(router.navigate).toHaveBeenCalledWith(jasmine.arrayContaining(['/parsed-url']));
    });

});
