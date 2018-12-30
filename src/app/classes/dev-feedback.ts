import {FeedbackState} from './feedback-state';
import {InterviewExtended} from './interview';
import {FeedbackDetails, FeedbackDetailsExtended} from './feedback-details';
import {EventNote} from './event-note';

export class DevFeedback extends EventNote{
  interviewId: number;
  candidateId: number;
  feedbackState: FeedbackState;
  feedbackDetails: FeedbackDetailsExtended[] = [];
  constructor(interview?: InterviewExtended) {
    super();
    if (interview) {
      this.candidateId = interview.candidateId;
      this.interviewId = interview.id;
      this.feedbackState = {
        name: 'new'
      };
      for (const requirement of interview.vacancy.requirements) {
        this.feedbackDetails.push(<FeedbackDetailsExtended> {
          requirementId: requirement.id,
          requirement: requirement,
          feedbackText: ''
        });
      }
    }
  }
}
