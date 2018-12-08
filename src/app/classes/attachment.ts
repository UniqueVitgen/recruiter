import { AttachmentType } from "../enums/attachment-type.enum";
import {EventNote} from './event-note';
import {EventNoteType} from '../enums/event-timeline-type.enum';

export class Attachment extends EventNote {
  attachmentType: AttachmentType;
  filePath: string;
}
