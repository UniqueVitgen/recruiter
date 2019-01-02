import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
export class CandidateTimelineComponent implements OnInit, OnChanges {
  @Input() candidate: Candidate;
  @Input() timelineNotes: BaseTimeline[];
  editedTimeLine: BaseTimeline[] = [];
  @Output('clickClose') outputClickClose: EventEmitter<any> = new EventEmitter();
  @Output('changeTimeline') outputChangeTimeline: EventEmitter<any> = new EventEmitter();
  @Output('addTimelineItem') outputAddTimelineItem: EventEmitter<any> = new EventEmitter();
  constructor(private typeCheckingWorker: TypeCheckingWorker,
              private eventTimelineWorker: EventTimelineWorker,
              private eventNoteWorker: EventNoteWorker,
              public  candidateService: CandidateService,
              public  arrayWorker: ArrayWorker) { }

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
  checkIfNoteIsDevFeedback(eventNote: EventNote) {
    return this.eventNoteWorker.isDevFeedback(eventNote);
  }
  checkIfNoteISAttachment(eventNote: EventNote) {
    return this.eventNoteWorker.isAttachement(eventNote);
  }
  checkIfNoteISCV(eventNote: EventNote) {
    return this.eventNoteWorker.isCV(eventNote);
  }
  checkIfNoteISImg(eventNote: EventNote) {
    return this.eventNoteWorker.isImg(eventNote);
  }
  changeTimeLine(canidate: Candidate) {
    this.outputAddTimelineItem.emit(this.candidate);
  }
  changeCandidate(baseTimeline: BaseTimeline, i: number) {
    this.outputChangeTimeline.emit(baseTimeline);
    // this.candidateService.update(this.candidate).subscribe();
    console.log(this.candidate);
  }
  deleteEvent(i: number) {
    // this.candidate.timelines = this.arrayWorker.removeElementByIndex(this.candidate.timelines, i);
    // this.candidateService.update(this.candidate).subscribe();
    this.outputClickClose.emit(i);
    console.log(this.candidate);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.timelineNotes);
    if (this.timelineNotes) {
      this.editedTimeLine = JSON.parse(JSON.stringify(this.timelineNotes));
    }
    console.log(this.editedTimeLine);
  }

}
