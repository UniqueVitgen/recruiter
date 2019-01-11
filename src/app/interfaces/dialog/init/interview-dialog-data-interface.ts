import {Interview, InterviewExtended} from '../../../classes/interview';
import {Candidate} from '../../../classes/candidate';
import {EventEmitter} from '@angular/core';
import {Interviewer} from '../../../classes/interviewer';

export interface InterviewDialogDataInterface {
  sourceDate: Date;
  sourceEndDate: Date;
  sourceCandidate: Candidate;
  fixedCandidate: boolean;
  sourceInterview?: Interview;
  sourceInterviewers?: Interviewer[];
  isEdit?: boolean;
  clickSave: EventEmitter<InterviewExtended>;
}
