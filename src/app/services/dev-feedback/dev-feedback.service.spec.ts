import { TestBed, inject } from '@angular/core/testing';

import { DevFeedbackService } from './dev-feedback.service';

describe('DevFeedbackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevFeedbackService]
    });
  });

  it('should be created', inject([DevFeedbackService], (service: DevFeedbackService) => {
    expect(service).toBeTruthy();
  }));
});
