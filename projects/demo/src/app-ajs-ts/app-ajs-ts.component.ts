import { AjsComponent } from 'ajs-to-angular';

import template from './app-ajs-ts.component.html';

@AjsComponent({
  name: 'appAjsTs',
  template,
})
export class AppAJSTSComponent {
  date: string;

  constructor() {
    this.date = new Date().toString();
  }
}
