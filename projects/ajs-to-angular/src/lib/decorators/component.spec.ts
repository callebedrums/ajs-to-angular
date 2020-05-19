
import { AjsComponent } from './component';

describe('Component decorator test suite::', () => {

  let target: any;

  beforeEach(() => {
    target = {
      name: 'MyComponent'
    };
  });

  it('should define a decorator factory and return a function', () => {
    const decorator = AjsComponent({});
    expect(typeof decorator).toEqual('function');
  });

  it('should set up component descriptor', () => {
    AjsComponent({})(target);

    expect(target.descriptor).toEqual(jasmine.objectContaining({
      name: 'my',
      controller: target,
      controllerAs: '$ctrl'
    }));
  });

  it('should set up component descriptor with template', () => {
    AjsComponent({
      template: '<p>test</p>'
    })(target);

    expect(target.descriptor.template).toEqual('<p>test</p>');
  });

  it('should set up component descriptor with template and styles', () => {
    AjsComponent({
      template: '<p>test</p>',
      styles: ['.test{color:#000;}']
    })(target);

    expect(target.descriptor.template).toEqual('<style>.test{color:#000;}</style><p>test</p>');
  });

  it('should set up component descriptor with require option', () => {
    AjsComponent({
      require: 'requiredController'
    })(target);

    expect(target.descriptor.require).toEqual('requiredController');
  });

  it('should set up component descriptor with transclude option', () => {
    AjsComponent({
      transclude: true
    })(target);

    expect(target.descriptor.transclude).toBe(true);
  });

  it('should set up component descriptor with bindings option', () => {
    AjsComponent({
      bindings: {
        name: '<',
        value: '='
      }
    })(target);

    expect(target.descriptor.bindings).toEqual(jasmine.objectContaining({
      name: '<',
      value: '='
    }));
  });

});
