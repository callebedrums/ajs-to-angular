# AjsToAngular

This project implements a small library to help with the migration from AngularJS to Angular.

It is actually a Angular workspace that contains two projects:

1. ajs-to-angular library

    The main project in the workspace. It contains the library to be puilt and published to an NPM registry

2. demo application

    A Hybrid Angular application to demonstrate how to consume the ajs-to-angular library

## Install

To install this project, first clone its repository to a local repository and then install its dependencies by running `npm install`

To install the library from npm package registry as one of yous application's dependency, use the following command:

```shell
npm install ajs-to-angular --registry [registry]
```

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the ajs-to-angular library. The build artifacts will be stored in the `dist/` directory ready to publishing.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `npm test:tdd` to execute the unit tests and keep listening for files changes to automatically run the tests again.

The project uses puppeteer dependency to run the tests in the headless chrome, which don't require a grafical interface environment to execute the tests.

## Consuming the library

After you have installed the library, you can now consume the library and start using it to help in the migration from AngularJS to Angular.

Keep in mind that the intention of the library is that you will remove it when your application is fully migrated to Angular.

The library is composed by a main Angular module, a single Angular Component, and a Single angular Serervice.
There are other small utilities implemented to help in the process, but we will present them later.

The library was designed to integrate applications that use ui-router library from angularjs.

### AjsToAngularModule Module

This is the main Angular Module implemented by the library and it should be imported in the rood Angular Module of your application

```TypeScript
import { AjsToAngularModule } from 'ajs-to-angular';

@NgModule({
  declarations: [
    AppComponent,
    // you components
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AjsToAngularModule // importing AjsToAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

This module declares and exports the main component implemented by this library. It also imports the UpgradeModule, used to link Angular and AngularJS applications together.

### AJS2NGComponent Component

This is the main Angular component implemented by the library. It is intent to be used in routes of your application to display angularJS apps in specific routes.

Its use should be similar like the example bellow:

```TypeScript
import { AJS2NGComponent } from 'projects/ajs-to-angular/src/public-api';


const routes: Routes = [
  {
    path: 'ajs-app', component: AJS2NGComponent // presents an angularjs app under the route /ajs-app
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

The AJS2NGComponent presents a simple template having only a ui-view directive on it. This way, the AngularJS app can bootstrap and presents its own routes under the ui-view

The AJS2NGComponent does not now how to and which angularjs application to display, so it delegates to the AJSLoaderService Service these tasks.

### AJSLoaderService Service

In order to load the right application, you have to let AJSLoaderService know how to load the applications. to do that, we configure it by using the *AJSLoaderService.addLoader* method

The AJSLoaderService.addLoader method receives one argument that can be either a *IAJSLoader* interface implementation or an array of *IAJSLoader* implementations.

The IAJSLoader interface defines two attributes: *test* that is a Regex expresion to be tested agains the current URL route; and *loader* that is a callable that resolves to a *IBootstrapApp* interface.

Consider configure the loaders in the Route Module constructor.

Maybe one example helps to understand:

```TypeScript
import { AJS2NGComponent, AJSLoaderService } from 'projects/ajs-to-angular/src/public-api';


const routes: Routes = [
    //...
  {
    path: 'ajs-app', component: AJS2NGComponent
  }
  // ...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(loader: AJSLoaderService) {
    loader.addLoader({
      test: /^\/ajs-app/,
      loader: () => import('../ajs-app.module')
    });
  }
}
```

In this example, we configured the loader to always load the ajs-app.module.\[t|j\]s file. This file have to return as default the AngularJS module definition to be bootstraped.
