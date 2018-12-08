import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NoteTimeline} from '../../../../classes/timeline/note-timeline';

@Component({
  selector: 'app-note-candidate-timeline-item',
  templateUrl: './note-candidate-timeline-item.component.html',
  styleUrls: ['./note-candidate-timeline-item.component.scss']
})
export class NoteCandidateTimelineItemComponent implements OnInit {
  @Input() note: NoteTimeline;
  @Output() changeCandidate: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  editedNote: NoteTimeline;
  constructor() { }
  ngOnInit() {
    this.editedNote = Object.assign({}, this.note);
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
