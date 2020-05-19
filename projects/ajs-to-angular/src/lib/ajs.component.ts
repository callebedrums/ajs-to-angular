import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AJSLoaderService } from './ajs-loader.service';

@Component({
  selector: 'ajs2ng-component',
  template: '<div ui-view></div>'
})
export class AJS2NGComponent implements OnInit, OnDestroy {

  private route: string;

  constructor(
    private loader: AJSLoaderService,
    private elRef: ElementRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.route = this.router.url;
    this.loader.load(this.elRef.nativeElement, this.route);
  }

  ngOnDestroy() {
    this.loader.destroy(this.elRef.nativeElement, this.route);
  }

}
