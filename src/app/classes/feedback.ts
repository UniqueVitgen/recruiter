import {FeedbackState} from './feedback-state';
import {EventNote} from './event-note';

export class Feedback extends EventNote {
  id: number;
  interviewId: number;
  feedbackText: string;
  candidateId: number;
  userId: number;
}
