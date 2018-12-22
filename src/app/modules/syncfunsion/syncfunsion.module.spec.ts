import { SyncfunsionModule } from './syncfunsion.module';

describe('SyncfunsionModule', () => {
  let syncfunsionModule: SyncfunsionModule;

  beforeEach(() => {
    syncfunsionModule = new SyncfunsionModule();
  });

  it('should create an instance', () => {
    expect(syncfunsionModule).toBeTruthy();
  });
});
