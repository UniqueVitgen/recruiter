import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AttachmentTimeline} from '../../../../classes/timeline/attachment-timeline';

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

  constructor() { }

  ngOnInit() {
    this.editedAttachment = Object.assign({}, this.attachment);
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
