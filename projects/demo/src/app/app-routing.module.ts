import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { AJS2NGComponent, AJSLoaderService } from 'projects/ajs-to-angular/src/public-api';


const routes: Routes = [
  {
    path: 'demo', component: DemoComponent
  },
  {
    path: 'ajs-ts', component: AJS2NGComponent
  },
  {
    path: 'ajs-requirejs', component: AJS2NGComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(loader: AJSLoaderService) {
    loader.addLoader({
      test: /^\/ajs-ts/,
      loader: () => import('../app-ajs-ts/app-ajs-ts.module')
    }).addLoader({
      test: /^\/ajs-requirejs/,
      loader: () => import('../app-ajs-requirejs')
    });
  }

}
