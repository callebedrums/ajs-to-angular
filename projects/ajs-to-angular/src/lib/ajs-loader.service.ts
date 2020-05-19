import * as angular from 'angular';
import { Injectable } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

export interface IBootstrapApp {
  default: { name: string };
}

export interface IAJSLoader {
  test: RegExp;
  loader: () => Promise<IBootstrapApp>;
}

@Injectable({
  providedIn: 'root'
})
export class AJSLoaderService {

  private loaders: IAJSLoader[] = [];

  private apps: any = {};

  constructor(
    private upgrade: UpgradeModule
  ) { }

  private loadAppAJS(path: string): Promise<IBootstrapApp> {
    for (const loader of this.loaders) {
      if (loader.test.test(path)) {
        return loader.loader();
      }
    }

    return Promise.reject('No loader found');
  }

  async load(el: HTMLElement, appRoute: string) {
    try {
      const app = await this.loadAppAJS(appRoute);

      try {
        this.apps[appRoute] = app;
        this.upgrade.bootstrap(el, [app.default.name], { strictDi: true });
      } catch (e) {
        console.error(`Error bootstraping application ${appRoute}`);
        console.error(e);
      }
    } catch (e) {
      console.error(`Error loading application ${appRoute}`);
      console.error(e);
    }
  }

  destroy(el: HTMLElement, appRoute: string) {
    if (this.apps[appRoute]) {
      angular.element(el).scope().$destroy();
    }
  }

  addLoader(loaders: IAJSLoader | IAJSLoader[]) {
    if (Array.isArray(loaders)) {
      this.loaders.push(...loaders);
    } else {
      this.loaders.push(loaders);
    }

    return this;
  }

}
