import {Component, Input, OnInit} from '@angular/core';
import {Candidate} from '../../../classes/candidate';
import {Events} from '../../../classes/events';
import {EventNote} from '../../../classes/event-note';
import {Interview} from '../../../classes/interview';
import {CandidateExperience} from '../../../classes/candidate-experience';
import {Notes} from '../../../classes/notes';
import {Attachment} from '../../../classes/attachment';
import {TypeCheckingWorker} from '../../../workers/type-checking/type-checking.worker';
import {EventNoteWorker} from '../../../workers/event-note/event-note.worker';
import {EventTimelineWorker} from '../../../workers/timeline/event-timeline.worker';
import * as moment from 'moment';
import Base = moment.unitOfTime.Base;
import {BaseTimeline} from '../../../classes/timeline/base-timeline';
import {CandidateService} from '../../../services/candidate/candidate.service';
import {ArrayWorker} from '../../../workers/array/array.worker';

@Component({
  selector: 'app-candidate-timeline',
  templateUrl: './candidate-timeline.component.html',
  styleUrls: ['./candidate-timeline.component.scss']
})
export class CandidateTimelineComponent implements OnInit {
  @Input() candidate: Candidate;

  @Input() timelineNotes: BaseTimeline[];
  constructor(private typeCheckingWorker: TypeCheckingWorker,
              private eventTimelineWorker: EventTimelineWorker,
              public  candidateService: CandidateService,
              public  arrayWorker: ArrayWorker) { }

  ngOnInit() {
  }
  checkIfNoteIsInterview(eventNote: BaseTimeline) {
    return this.eventTimelineWorker.isInterview(eventNote);
  }
  checkIfNoteIsExperience(eventNote: BaseTimeline) {
    return this.eventTimelineWorker.isExperience(eventNote);
  }
  checkIfNoteISNote(eventNote: BaseTimeline) {
    return this.eventTimelineWorker.isNote(eventNote);
  }
  checkIfNoteISAttachment(eventNote: BaseTimeline) {
    return this.eventTimelineWorker.isAttachement(eventNote);
  }
  changeTimeLine(timeline) {
    this.candidate.timelines = timeline;
    this.candidateService.update(this.candidate).subscribe();
  }
  changeCandidate(baseTimeline: BaseTimeline, i: number) {
    this.candidate.timelines[i] = baseTimeline;
    this.candidateService.update(this.candidate).subscribe();
    console.log(this.candidate);
  }
  deleteEvent(i: number) {
    this.candidate.timelines = this.arrayWorker.removeElementByIndex(this.candidate.timelines, i);
    this.candidateService.update(this.candidate).subscribe();
    console.log(this.candidate);
  }

}
