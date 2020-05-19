import { AjsController } from './controller';

describe('Dependencies decorator test suite::', () => {

    const $inject: string[] = null;

    it('should define a decorator factory and return a function', () => {
        const decorator = AjsController([]);
        expect(typeof decorator).toEqual('function');
    });

    it('should set up target.controller flag', () => {
        const dependencies = ['dep1', { name: 'dep2' }];
        const target: any = {};
        AjsController(dependencies)(target);

        expect(target.controller).toBe(true);
    });
});
