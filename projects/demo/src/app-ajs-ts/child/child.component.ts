import { AjsComponent } from 'ajs-to-angular';

import template from './child.component.html';

@AjsComponent({
  name: 'child',
  template,
})
export class ChildComponent {
  patient = {
    name: 'Davis, Seans',
    id: '123456778',
    gender: 'Male',
    dob: 'Apr 19 1999',
    age: '18',
  };

  constructor() {}
}
