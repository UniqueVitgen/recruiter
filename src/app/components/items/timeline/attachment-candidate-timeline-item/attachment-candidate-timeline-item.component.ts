import {Component, Input, OnInit} from '@angular/core';
import {Attachment} from '../../../../classes/attachment';

@Component({
  selector: 'app-attachment-candidate-timeline-item',
  templateUrl: './attachment-candidate-timeline-item.component.html',
  styleUrls: ['./attachment-candidate-timeline-item.component.scss']
})
export class AttachmentCandidateTimelineItemComponent implements OnInit {
  @Input() attachment: Attachment;

  constructor() { }

  ngOnInit() {
  }

}
