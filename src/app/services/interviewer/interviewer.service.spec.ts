import { TestBed, inject } from '@angular/core/testing';

import { InterviewerService } from './interviewer.service';

describe('InterviewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterviewerService]
    });
  });

  it('should be created', inject([InterviewerService], (service: InterviewerService) => {
    expect(service).toBeTruthy();
  }));
});
