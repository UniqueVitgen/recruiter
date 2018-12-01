import {EventNote} from './event-note';
import {EventNoteType} from '../enums/event-note-type.enum';

export class Notes extends EventNote {
  interviewer: string;
  date: string;
  noteText: string;
}
