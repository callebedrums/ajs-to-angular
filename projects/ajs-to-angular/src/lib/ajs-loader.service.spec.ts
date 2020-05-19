import * as angular from 'angular';
import { AJSLoaderService, IAJSLoader, IBootstrapApp } from './ajs-loader.service';

describe('AngularjsLoaderService', () => {

  let service: AJSLoaderService;
  let router;
  let upgrade;


  beforeEach(() => {
    upgrade = jasmine.createSpyObj('UpgradeModule', ['bootstrap']);
    router = { name: 'Router' };
    service = new AJSLoaderService(upgrade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Instance', () => {
    let loaderSuccess: IAJSLoader;
    let loaderError: IAJSLoader;
    let resolve: Promise<IBootstrapApp>;

    let $destroy;
    let element;

    beforeEach(() => {

      $destroy = jasmine.createSpy();
      element = 'Element';

      spyOn(console, 'error');
      spyOn(angular, 'element').and.returnValue({
        scope: () => ({ $destroy })
      });

      resolve = Promise.resolve({ default: { name: 'appname' } });
      loaderSuccess = {
        test: /^\/my\/app\/path/,
        loader: () => resolve
      };

      service.addLoader(loaderSuccess);
    });

    it('should load and destroy application', async () => {
      service.load(element as HTMLElement, '/my/app/path');

      await resolve;

      expect(upgrade.bootstrap).toHaveBeenCalledWith('Element', jasmine.arrayContaining(['appname']), jasmine.objectContaining({ strictDi: true }));

      service.destroy(element as HTMLElement, '/my/app/path');

      expect(angular.element).toHaveBeenCalledWith('Element');
      expect($destroy).toHaveBeenCalled();
    });

    it('should fail on load application', done => {
      const reject = Promise.reject();
      loaderError = {
        test: /^\/my\/error\/path/,
        loader: () => reject
      };
      service.addLoader([loaderError]);

      service.load(element as HTMLElement, '/my/error/path');

      reject.finally(() => {
        expect(console.error).toHaveBeenCalledWith('Error loading application /my/error/path');
        done();
      });
    });

    it('should fail on bootstrap application', async () => {
      upgrade.bootstrap.and.throwError('error test');

      service.load(element as HTMLElement, '/my/app/path');

      await resolve;

      expect(upgrade.bootstrap).toHaveBeenCalledWith('Element', jasmine.arrayContaining(['appname']), jasmine.objectContaining({ strictDi: true }));
      expect(console.error).toHaveBeenCalledWith('Error bootstraping application /my/app/path');
    });

    it('should fail on load application if no loader is found', done => {
      const spy = spyOn(Promise, 'reject');
      spy.and.callThrough();

      service.load(element as HTMLElement, '/non/existing/loader');

      expect(Promise.reject).toHaveBeenCalledWith('No loader found');

      spy.calls.mostRecent().returnValue.finally(() => {
        expect(console.error).toHaveBeenCalledWith('No loader found');
        done();
      });
    });

    it('should not destroy a not bootstraped application', () => {
      service.destroy(element as HTMLElement, '/not/bootstraped/app');

      expect(angular.element).not.toHaveBeenCalled();
    });

  });

});
