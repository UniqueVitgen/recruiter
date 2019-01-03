import {FeedbackState} from './feedback-state';
import {Interview, InterviewExtended} from './interview';
import {FeedbackDetails, FeedbackDetailsExtended} from './feedback-details';
import {EventNote} from './event-note';
import {Candidate} from './candidate';
import {Vacancy} from './vacancy';

export class DevFeedback extends EventNote{
  interviewId: number;
  candidateId: number;
  feedbackState: FeedbackState;
  feedbackDetails: FeedbackDetailsExtended[] = [];
  interview?: InterviewExtended;
  candidate?: Candidate;
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
