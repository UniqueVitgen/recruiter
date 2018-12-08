
import {EventNote} from './event-note';
import {AttachmentType} from '../enums/attachment-type.enum';
// import {EventNoteType} from '../enums/event-timeline-type.enum';

export class Attachment extends EventNote {
  attachmentType: AttachmentType;
  filePath: string;
}
