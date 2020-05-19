import { AjsDependencies } from './dependencies';

describe('Dependencies decorator test suite::', () => {

  const $inject: string[] = null;

  it('should define a decorator factory and return a function', () => {
    const decorator = AjsDependencies([]);
    expect(typeof decorator).toEqual('function');
  });

  it('should set up target.$inject array', () => {
    const dependencies = ['dep1', { name: 'dep2' }];
    const target = { $inject };
    AjsDependencies(dependencies)(target);

    expect(target.$inject).toEqual(jasmine.arrayContaining(['dep1', 'dep2']));
  });

  it('should not set up target.$inject when dependency array is empty', () => {
    const dependencies: any[] = [];
    const target = { $inject };
    AjsDependencies(dependencies)(target);

    expect(target.$inject).toBeNull();
  });
});
