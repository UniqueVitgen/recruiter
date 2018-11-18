import { Candidate } from "src/app/classes/candidate";

import { Attachment } from "src/app/classes/attachment";

export interface AttachmentDialogData {
  sourceCandidate: Candidate;
  sourceAttachment?: Attachment;
  isEdit?: boolean;
}
