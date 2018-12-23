import {Candidate} from '../../../classes/candidate';
import {Attachment} from '../../../classes/attachment';
import {Vacancy} from '../../../classes/vacancy';

export interface JobDescriptionDialogData {
  sourceJobDescription: Vacancy;
  isEdit?: boolean;
  dialogWindowTitle: string;
}
