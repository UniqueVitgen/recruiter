import {BaseTimeline} from './base-timeline';
import {Team} from '../team';
import {PositionModel} from '../position-model';

export class ExperienceTimeline extends BaseTimeline {
  companyName: Team;
  dateFrom: Date;
  dateTo: Date;
  jobPosition: PositionModel;
  comment: string;
  createdAt?: Date;
}
