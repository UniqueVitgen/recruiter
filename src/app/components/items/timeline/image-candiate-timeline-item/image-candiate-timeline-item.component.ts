import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AttachmentTimeline} from '../../../../classes/timeline/attachment-timeline';
import {Attachment} from '../../../../classes/attachment';
import {CandidateWorker} from '../../../../workers/candidate/candidate.worker';
import {DateTimeWorker} from '../../../../workers/date-time/date-time.worker';

@Component({
  selector: 'app-image-candiate-timeline-item',
  templateUrl: './image-candiate-timeline-item.component.html',
  styleUrls: ['./image-candiate-timeline-item.component.scss']
})
export class ImageCandiateTimelineItemComponent implements OnInit {
  @Input() attachment: Attachment;
  viewOfDate: string;
  editedAttachment: Attachment;
  @Output() changeCandidate: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

  constructor(public candidateWorker: CandidateWorker, private dateTimeWorker: DateTimeWorker) { }

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
