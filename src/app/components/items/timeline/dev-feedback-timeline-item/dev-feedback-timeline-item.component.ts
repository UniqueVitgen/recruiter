import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Feedback} from '../../../../classes/feedback';
import {DateTimeWorker} from '../../../../workers/date-time/date-time.worker';
import {TranslateWorker} from '../../../../workers/translate/translate.worker';
import {DevFeedback} from '../../../../classes/dev-feedback';
import {TypeCheckingWorker} from '../../../../workers/type-checking/type-checking.worker';

@Component({
  selector: 'app-dev-feedback-timeline-item',
  templateUrl: './dev-feedback-timeline-item.component.html',
  styleUrls: ['./dev-feedback-timeline-item.component.scss']
})
export class DevFeedbackTimelineItemComponent implements OnInit, OnChanges {
  @Input() note: DevFeedback;
  @Output() changeCandidate: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  editedNote: DevFeedback;
  viewOfDate: string;
  viewOfInterview: string;
  private isSaved: boolean = true;
  constructor(private dateTimeWorker: DateTimeWorker, private translateWorker: TranslateWorker, private typeCheckingWorker: TypeCheckingWorker) { }
  ngOnInit() {
    this.editedNote = Object.assign({}, this.note);
    this.viewOfDate = this.dateTimeWorker.getDateWithTime(this.editedNote.createdAt);
    this.translateWorker.changeValue.subscribe((res) => {
      this.viewOfDate = this.dateTimeWorker.getDateWithTime(this.editedNote.createdAt);
    });
    this.viewOfInterview = this.dateTimeWorker.getDateWithTime(new Date(this.editedNote.interview.planDate));
    this.translateWorker.changeValue.subscribe((res) => {
      this.viewOfInterview = this.dateTimeWorker.getDateWithTime(new Date(this.editedNote.interview.planDate));
    });
  console.log('position', this.editedNote.interview.vacancy.position);
  }
  onFocusoutAnyInput(value: boolean = true) {
    if (value) {
      this.isSaved = true;
      console.log('exp', this.editedNote);
      this.changeCandidate.emit(this.editedNote);
    } else {
      this.isSaved = false;
    }
  }
  delete() {
    this.deleteEvent.emit(this.editedNote);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isSaved) {
      this.editedNote = this.typeCheckingWorker.parseObject(this.note);
    }
  }

}
