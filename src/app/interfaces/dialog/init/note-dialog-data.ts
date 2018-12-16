import {Candidate} from '../../../classes/candidate';
import {Attachment} from '../../../classes/attachment';
import {Feedback} from '../../../classes/feedback';

export interface NoteDialogData {
  sourceCandidate: Candidate;
  sourceFeedback?: Feedback;
  isEdit?: boolean;
}
