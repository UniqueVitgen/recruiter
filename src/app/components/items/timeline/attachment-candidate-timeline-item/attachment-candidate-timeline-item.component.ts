import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AttachmentTimeline} from '../../../../classes/timeline/attachment-timeline';
import {Attachment} from '../../../../classes/attachment';
import {FileWorker} from '../../../../workers/file/file.worker';
import {DateTimeWorker} from '../../../../workers/date-time/date-time.worker';

@Component({
  selector: 'app-attachment-candidate-timeline-item',
  templateUrl: './attachment-candidate-timeline-item.component.html',
  styleUrls: ['./attachment-candidate-timeline-item.component.scss']
})
export class AttachmentCandidateTimelineItemComponent implements OnInit, OnChanges {
  @Input() attachment: Attachment;

  editedAttachment: Attachment;
  @Output() changeCandidate: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  viewOfDate: string;

  constructor(public fileWorker: FileWorker, private dateTimeWorker: DateTimeWorker) { }

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

  ngOnChanges(changes: SimpleChanges): void {
    this.viewOfDate = this.dateTimeWorker.getDateWithTime(this.editedAttachment.createdAt);
  }
}
