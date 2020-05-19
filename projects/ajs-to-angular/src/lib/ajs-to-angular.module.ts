import { NgModule } from '@angular/core';
import { AJS2NGComponent } from './ajs.component';
import { CommonModule } from '@angular/common';
import { UpgradeModule } from '@angular/upgrade/static';

@NgModule({
  declarations: [
    AJS2NGComponent
  ],
  imports: [
    CommonModule,
    UpgradeModule
  ],
  exports: [
    AJS2NGComponent
  ]
})
export class AjsToAngularModule { }
