import { Injectable } from '@angular/core';
import {EventNote} from '../../classes/event-note';
import {Interview} from '../../classes/interview';
import {CandidateExperience} from '../../classes/candidate-experience';
import {Notes} from '../../classes/notes';
import {Attachment} from '../../classes/attachment';

@Injectable({
  providedIn: 'root'
})
export class EventNoteWorker {
  public isInterview(eventNote: EventNote) {
    const interview = <Interview> eventNote;
    return interview.candidateId != null && interview.vacancyId != null;
  }

  public isExperience(eventNote: EventNote) {
    const experiecne = <CandidateExperience> eventNote;
    return experiecne.dateFrom != null && experiecne.dateTo != null;
  }
  public isNote(eventNote: EventNote) {
    const note = <Notes> eventNote;
    return note.noteText;
  }
  public isAttachement(eventNote: EventNote) {
    const attachment = <Attachment> eventNote;
    return attachment.filePath != null && attachment.attachmentType != null;
  }
}
