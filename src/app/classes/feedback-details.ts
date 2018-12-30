import {Requirement} from './requirement';

export class FeedbackDetails {
  id?: number;
  requirementId: number;
  devFeedbackId?: number;
  feedbackText: string;
}

export class FeedbackDetailsExtended extends FeedbackDetails{
  requirement: Requirement;
}
