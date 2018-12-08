import { AttachmentType } from "../enums/attachment-type.enum";
import {EventNote} from './event-note';
import {EventTimelineType} from '../enums/event-timeline-type.enum';

export class Attachment extends EventNote {
  attachmentType: AttachmentType;
  filePath: string;
}
