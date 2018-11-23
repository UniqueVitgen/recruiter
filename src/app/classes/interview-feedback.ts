import {FeedbackState} from './feedback-state';

export class InterviewFeedback {
  id?: number;
  interviewId: number;
  interviewerId?: number;
  reason?: string;
  feedbackState: FeedbackState;
}
