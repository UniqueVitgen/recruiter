import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Feedback} from '../../../../classes/feedback';
import {DateTimeWorker} from '../../../../workers/date-time/date-time.worker';
import {TranslateWorker} from '../../../../workers/translate/translate.worker';
import {DevFeedback} from '../../../../classes/dev-feedback';

@Component({
  selector: 'app-dev-feedback-timeline-item',
  templateUrl: './dev-feedback-timeline-item.component.html',
  styleUrls: ['./dev-feedback-timeline-item.component.scss']
})
export class DevFeedbackTimelineItemComponent implements OnInit {
  @Input() note: DevFeedback;
  @Output() changeCandidate: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  editedNote: DevFeedback;
  viewOfDate: string;
  constructor(private dateTimeWorker: DateTimeWorker, private translateWorker: TranslateWorker) { }
  ngOnInit() {
    this.editedNote = Object.assign({}, this.note);
    this.viewOfDate = this.dateTimeWorker.getDateWithTime(this.editedNote.createdAt);
    this.translateWorker.changeValue.subscribe((res) => {
      this.viewOfDate = this.dateTimeWorker.getDateWithTime(this.editedNote.createdAt);
    });

  }
  onFocusoutAnyInput(value: boolean = true) {
    if (value) {
      console.log('exp', this.editedNote);
      this.changeCandidate.emit(this.editedNote);
    }
  }
  delete() {
    this.deleteEvent.emit(this.editedNote);
  }

}
