import {Component, Input, OnInit} from '@angular/core';
import {Candidate} from '../../../classes/candidate';
import {EventNote} from '../../../classes/event-note';
import {Interview} from '../../../classes/interview';
import {CandidateExperience} from '../../../classes/candidate-experience';
import {Notes} from '../../../classes/notes';
import {Attachment} from '../../../classes/attachment';
import {TypeCheckingWorker} from '../../../workers/type-checking/type-checking.worker';
import {EventNoteWorker} from '../../../workers/event-note/event-note.worker';

@Component({
  selector: 'app-candidate-timeline',
  templateUrl: './candidate-timeline.component.html',
  styleUrls: ['./candidate-timeline.component.scss']
})
export class CandidateTimelineComponent implements OnInit {
  @Input() candidate: Candidate;
  @Input() timelineNotes: EventNote[];

  constructor(private typeCheckingWorker: TypeCheckingWorker,
              private eventNoteWorker: EventNoteWorker) { }

  ngOnInit() {
  }
  checkIfNoteIsInterview(eventNote: EventNote) {
    return this.eventNoteWorker.isInterview(eventNote);
  }
  checkIfNoteIsExperience(eventNote: EventNote) {
    return this.eventNoteWorker.isExperience(eventNote);
  }
  checkIfNoteISNote(eventNote: EventNote) {
    return this.eventNoteWorker.isNote(eventNote);
  }
  checkIfNoteISAttachment(eventNote: EventNote) {
    return this.eventNoteWorker.isAttachement(eventNote);
  }

}
