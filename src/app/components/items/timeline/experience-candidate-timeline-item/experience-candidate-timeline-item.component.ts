import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExperienceTimeline} from '../../../../classes/timeline/experience-timeline';

@Component({
  selector: 'app-experience-candidate-timeline-item',
  templateUrl: './experience-candidate-timeline-item.component.html',
  styleUrls: ['./experience-candidate-timeline-item.component.scss']
})
export class ExperienceCandidateTimelineItemComponent implements OnInit {
  @Input() experience: ExperienceTimeline;

  @Output() changeCandidate: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

  editedExperience: ExperienceTimeline;
  constructor() { }

  ngOnInit() {
    this.editedExperience = Object.assign({}, this.experience);
  }

  onFocusoutAnyInput(value: boolean = true) {
    if (value) {
      console.log('exp', this.editedExperience);
      this.changeCandidate.emit(this.editedExperience);
    }
  }
  delete() {
    this.deleteEvent.emit(this.editedExperience);
  }

}
