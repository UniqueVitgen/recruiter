import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExperienceTimeline} from '../../../../classes/timeline/experience-timeline';
import {DateTimeWorker} from '../../../../workers/date-time/date-time.worker';
import {TranslateWorker} from '../../../../workers/translate/translate.worker';

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
  viewOfDate: string;
  constructor(private dateTimeWorker: DateTimeWorker, private translateWorker: TranslateWorker) { }

  ngOnInit() {
    this.editedExperience = Object.assign({}, this.experience);
    this.viewOfDate = this.dateTimeWorker.getDateWithTime(this.editedExperience.createdAt);
    this.translateWorker.changeValue.subscribe((res) => {
      this.viewOfDate = this.dateTimeWorker.getDateWithTime(this.editedExperience.createdAt);
    });
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
