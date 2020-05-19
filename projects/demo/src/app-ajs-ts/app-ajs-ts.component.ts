import { AjsComponent } from 'projects/ajs-to-angular/src/public-api';

@AjsComponent({
  name: 'appAjsTs',
  template: require('./app-ajs-ts.component.html')
})
export class AppAJSTSComponent {

  date: string;

  constructor() {
    this.date = new Date().toString();
  }

}
