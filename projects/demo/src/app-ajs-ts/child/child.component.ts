import { AjsComponent } from 'projects/ajs-to-angular/src/public-api';

@AjsComponent({
  name: 'child',
  template: require('./child.component.html')
})
export class ChildComponent {

  patient = {
    name: 'Davis, Seans',
    id: '123456778',
    gender: 'Male',
    dob: 'Apr 19 1999',
    age: '18',
  };

  constructor() { }

}
