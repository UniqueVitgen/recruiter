import { DevExpressModule } from './dev-express.module';

describe('DevExpressModule', () => {
  let devExpressModule: DevExpressModule;

  beforeEach(() => {
    devExpressModule = new DevExpressModule();
  });

  it('should create an instance', () => {
    expect(devExpressModule).toBeTruthy();
  });
});
