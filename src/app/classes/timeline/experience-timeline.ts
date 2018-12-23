import {BaseTimeline} from './base-timeline';
import {Team} from '../team';

export class ExperienceTimeline extends BaseTimeline {
  companyName: Team;
  dateFrom: Date;
  dateTo: Date;
  jobPosition: string;
  comment: string;
  createdAt?: Date;
}
