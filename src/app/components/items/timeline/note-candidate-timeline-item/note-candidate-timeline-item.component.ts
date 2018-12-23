import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NoteTimeline} from '../../../../classes/timeline/note-timeline';
import {Feedback} from '../../../../classes/feedback';
import {DateTimeWorker} from '../../../../workers/date-time/date-time.worker';

@Component({
  selector: 'app-note-candidate-timeline-item',
  templateUrl: './note-candidate-timeline-item.component.html',
  styleUrls: ['./note-candidate-timeline-item.component.scss']
})
export class NoteCandidateTimelineItemComponent implements OnInit {
  @Input() note: Feedback;
  @Output() changeCandidate: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  editedNote: Feedback;
  viewOfDate: string;
  constructor(private dateTimeWorker: DateTimeWorker) { }
  ngOnInit() {
    this.editedNote = Object.assign({}, this.note);
    this.viewOfDate = this.dateTimeWorker.getDateWithTime(this.editedNote.createdAt);

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
