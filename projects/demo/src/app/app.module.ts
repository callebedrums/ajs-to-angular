import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { AjsToAngularModule } from 'ajs-to-angular';

@NgModule({
  declarations: [AppComponent, DemoComponent],
  imports: [BrowserModule, AppRoutingModule, AjsToAngularModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
