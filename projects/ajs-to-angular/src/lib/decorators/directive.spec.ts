
import { AjsDirective } from './directive';

describe('Directive decorator test suite:', () => {

  let target: any;

  beforeEach(() => {
    target = {
      name: 'MyDirective'
    };
  });

  it('should define a decorator factory and return a function', () => {
    const decorator = AjsDirective({});
    expect(typeof decorator).toEqual('function');
  });

  it('should set up directive descriptor', () => {
    AjsDirective({})(target);

    expect(target.directive).toBe(true);
    expect(target.descriptor).toEqual(jasmine.objectContaining({
      name: 'my',
      controller: target
    }));
  });

  it('should set up directive descriptor with template', () => {
    AjsDirective({
      template: '<p>test</p>'
    })(target);

    expect(target.descriptor.template).toEqual('<p>test</p>');
  });

  it('should set up directive descriptor with template and styles', () => {
    AjsDirective({
      template: '<p>test</p>',
      styles: ['.test{color:#000;}']
    })(target);

    expect(target.descriptor.template).toEqual('<style>.test{color:#000;}</style><p>test</p>');
  });

  it('should set up directive descriptor with priority option', () => {
    AjsDirective({
      priority: 1
    })(target);

    expect(target.descriptor.priority).toEqual(1);
  });

  it('should set up directive descriptor with transclude option', () => {
    AjsDirective({
      transclude: true
    })(target);

    expect(target.descriptor.transclude).toEqual(true);
  });

  it('should set up directive descriptor with restrict option', () => {
    AjsDirective({
      restrict: 'AE'
    })(target);

    expect(target.descriptor.restrict).toEqual('AE');
  });

  it('should set up directive descriptor with templateNamespace option', () => {
    AjsDirective({
      templateNamespace: 'svg'
    })(target);

    expect(target.descriptor.templateNamespace).toEqual('svg');
  });

  it('should set up directive descriptor with scope option', () => {
    AjsDirective({
      scope: { abc: '=' }
    })(target);

    expect(target.descriptor.scope).toEqual(jasmine.objectContaining({ abc: '=' }));
  });

  it('should set up directive descriptor with controllerAs option', () => {
    AjsDirective({
      controllerAs: 'myController'
    })(target);

    expect(target.descriptor.controllerAs).toEqual('myController');
  });

  it('should set up directive descriptor with bindToController option', () => {
    AjsDirective({
      bindToController: true
    })(target);

    expect(target.descriptor.bindToController).toEqual(true);
  });

  it('should set up directive descriptor with require option', () => {
    AjsDirective({
      require: '^pController'
    })(target);

    expect(target.descriptor.require).toEqual('^pController');
  });

  it('should set up directive descriptor with multiElement option', () => {
    AjsDirective({
      multiElement: true
    })(target);

    expect(target.descriptor.multiElement).toEqual(true);
  });

  it('should set up directive descriptor with compile option', () => {
    AjsDirective({
      compile: 'compiler method'
    })(target);

    expect(target.descriptor.compile).toEqual('compiler method');
  });

  it('should set up directive descriptor with link option', () => {
    AjsDirective({
      link: 'link method'
    })(target);

    expect(target.descriptor.link).toEqual('link method');
  });

});
