import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InterviewTimeline} from '../../../../classes/timeline/interview-timeline';
import {Interview} from '../../../../classes/interview';

@Component({
  selector: 'app-interview-candidate-timeline-item',
  templateUrl: './interview-candidate-timeline-item.component.html',
  styleUrls: ['./interview-candidate-timeline-item.component.scss']
})
export class InterviewCandidateTimelineItemComponent implements OnInit {
  @Input() interview: Interview;
  @Output() changeCandidate: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

  editedInterview: Interview;
  constructor() { }
  ngOnInit() {
    this.editedInterview = Object.assign({}, this.interview);
  }
  onFocusoutAnyInput(value: boolean = true) {
    if (value) {
      console.log('exp', this.editedInterview);
      this.changeCandidate.emit(this.editedInterview);
    }
  }
  delete() {
    this.deleteEvent.emit(this.editedInterview);
  }

}
