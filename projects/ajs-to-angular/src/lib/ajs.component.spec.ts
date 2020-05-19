import { AJS2NGComponent } from './ajs.component';

describe('JSComponent', () => {
  let component: AJS2NGComponent;
  let loader;
  let elRef;
  let router;

  beforeEach(() => {

    loader = jasmine.createSpyObj('AJSLoaderService', ['load', 'destroy']);
    elRef = { nativeElement: 'test-nativeElement' };
    router = { url: 'test-url' };

    component = new AJS2NGComponent(loader, elRef, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load application and destroy application', () => {
    component.ngOnInit();
    expect(loader.load).toHaveBeenCalledWith('test-nativeElement', 'test-url');

    component.ngOnDestroy();
    expect(loader.destroy).toHaveBeenCalledWith('test-nativeElement', 'test-url');
  });
});
