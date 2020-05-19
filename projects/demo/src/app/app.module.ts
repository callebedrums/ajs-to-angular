import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { AjsToAngularModule } from '../../../ajs-to-angular/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AjsToAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
