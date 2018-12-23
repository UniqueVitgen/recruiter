import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AttachmentTimeline} from '../../../../classes/timeline/attachment-timeline';
import {DateTimeWorker} from '../../../../workers/date-time/date-time.worker';

@Component({
  selector: 'app-attachment-candidate-timeline-item',
  templateUrl: './attachment-candidate-timeline-item.component.html',
  styleUrls: ['./attachment-candidate-timeline-item.component.scss']
})
export class AttachmentCandidateTimelineItemComponent implements OnInit {
  @Input() attachment: AttachmentTimeline;

  editedAttachment: AttachmentTimeline;
  @Output() changeCandidate: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  viewOfDate: string;

  constructor(private dateTimeWorker: DateTimeWorker) { }

  ngOnInit() {
    this.editedAttachment = Object.assign({}, this.attachment);
    this.viewOfDate = this.dateTimeWorker.getDateWithTime(this.editedAttachment.createdAt);

  }

  onFocusoutAnyInput(value: boolean = true) {
    if (value) {
      console.log('attachment', this.editedAttachment);
      this.changeCandidate.emit(this.editedAttachment);
    }
  }
  delete() {
    this.deleteEvent.emit(this.editedAttachment);
  }
}
