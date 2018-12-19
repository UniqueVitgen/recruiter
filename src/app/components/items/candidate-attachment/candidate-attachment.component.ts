import { 
  Component, 
  OnInit, 
  Input, 
  Output,
  EventEmitter
} from '@angular/core';
import { Attachment } from 'src/app/classes/attachment';
import {AttachmentTimeline} from '../../../classes/timeline/attachment-timeline';
import {FileWorker} from '../../../workers/file/file.worker';
import {CandidateWorker} from '../../../workers/candidate/candidate.worker';

@Component({
  selector: 'app-candidate-attachment',
  templateUrl: './candidate-attachment.component.html',
  styleUrls: ['./candidate-attachment.component.scss']
})
export class CandidateAttachmentComponent implements OnInit {
  @Input() attachment: Attachment;
  @Output() onDelete: EventEmitter<Attachment> = new EventEmitter();

  constructor(private fileWorker: FileWorker, public candidateWorker: CandidateWorker) { }

  ngOnInit() {
  }

  deleteAttachment() {
    this.onDelete.emit(this.attachment);
  }

}
