import { TestBed, inject } from '@angular/core/testing';

import { InterviewFeedbackService } from './interview-feedback.service';

describe('InterviewFeedbackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterviewFeedbackService]
    });
  });

  it('should be created', inject([InterviewFeedbackService], (service: InterviewFeedbackService) => {
    expect(service).toBeTruthy();
  }));
});
