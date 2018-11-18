import { 
  Component, 
  OnInit, 
  Input, 
  Output,
  EventEmitter
} from '@angular/core';
import { Attachment } from 'src/app/classes/attachment';

@Component({
  selector: 'app-candidate-attachment',
  templateUrl: './candidate-attachment.component.html',
  styleUrls: ['./candidate-attachment.component.scss']
})
export class CandidateAttachmentComponent implements OnInit {
  @Input() attachment: Attachment;
  @Output() onDelete: EventEmitter<Attachment> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteAttachment() {
    this.onDelete.emit(this.attachment);
  }

}
