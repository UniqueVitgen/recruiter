import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Attachment} from '../../../classes/attachment';
import {AttachmentType} from '../../../enums/attachment-type.enum';

@Component({
  selector: 'app-candidate-timeline-toolbar',
  templateUrl: './candidate-timeline-toolbar.component.html',
  styleUrls: ['./candidate-timeline-toolbar.component.scss']
})
export class CandidateTimelineToolbarComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
