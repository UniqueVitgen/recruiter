import { PrimeNGModule } from './prime-ng.module';

describe('PrimeNGModule', () => {
  let primeNGModule: PrimeNGModule;

  beforeEach(() => {
    primeNGModule = new PrimeNGModule();
  });

  it('should create an instance', () => {
    expect(primeNGModule).toBeTruthy();
  });
});
