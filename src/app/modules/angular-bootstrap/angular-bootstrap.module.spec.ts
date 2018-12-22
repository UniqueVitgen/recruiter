import { AngularBootstrapModule } from './angular-bootstrap.module';

describe('AngularBootstrapModule', () => {
  let angularBootstrapModule: AngularBootstrapModule;

  beforeEach(() => {
    angularBootstrapModule = new AngularBootstrapModule();
  });

  it('should create an instance', () => {
    expect(angularBootstrapModule).toBeTruthy();
  });
});
