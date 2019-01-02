import {Interview, InterviewExtended} from '../../../classes/interview';
import {Candidate} from '../../../classes/candidate';
import {EventEmitter} from '@angular/core';

export interface InterviewDialogDataInterface {
  sourceDate: Date;
  sourceCandidate: Candidate;
  fixedCandidate: boolean;
  sourceInterview?: Interview;
  isEdit?: boolean;
  clickSave: EventEmitter<InterviewExtended>;
}
