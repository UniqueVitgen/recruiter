import { Injectable } from '@angular/core';
import {EventNote} from '../../classes/event-note';
import {Interview} from '../../classes/interview';
import {CandidateExperience} from '../../classes/candidate-experience';
import {Notes} from '../../classes/notes';
import {Attachment} from '../../classes/attachment';
import {Feedback} from '../../classes/feedback';

@Injectable({
  providedIn: 'root'
})
export class EventNoteWorker {
  public isInterview(eventNote: EventNote) {
    const interview = <Interview> eventNote;
    if (interview) {
      return interview.candidateId != null && interview.planDate != null;
    }
  }

  public isExperience(eventNote: EventNote) {
    const experience = <CandidateExperience> eventNote;
    if (experience) {
      return experience.dateFrom != null && experience.dateTo != null;
    }
  }
  public isNote(eventNote: EventNote) {
    const note = <Feedback> eventNote;
    if (note) {
      return note.feedbackText;
    }
  }
  public isAttachement(eventNote: EventNote) {
    const attachment = <Attachment> eventNote;
    if (attachment) {
      return attachment.filePath != null && attachment.attachmentType != null;
    }
  }
}
