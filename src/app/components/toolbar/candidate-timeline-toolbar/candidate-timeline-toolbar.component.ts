import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {InterviewTimeline} from '../../../classes/timeline/interview-timeline';
import {BaseTimeline} from '../../../classes/timeline/base-timeline';
import {AttachmentTimeline} from '../../../classes/timeline/attachment-timeline';
import {ExperienceTimeline} from '../../../classes/timeline/experience-timeline';
import {NoteTimeline} from '../../../classes/timeline/note-timeline';
import {EventTimelineType} from '../../../enums/event-timeline-type.enum';

@Component({
  selector: 'app-candidate-timeline-toolbar',
  templateUrl: './candidate-timeline-toolbar.component.html',
  styleUrls: ['./candidate-timeline-toolbar.component.scss']
})
export class CandidateTimelineToolbarComponent implements OnChanges {

  @Input() timelineNotes: BaseTimeline[];
  @Output('changeTimeline') outputChangeTimeline = new EventEmitter();
  internalTimeLineList: BaseTimeline[];
  constructor() { }

  ngOnChanges() {
    this.internalTimeLineList = this.timelineNotes.slice();
  }

  addAssignInterview() {
    console.log(this.internalTimeLineList);
    this.internalTimeLineList.unshift(<InterviewTimeline> {
      when: new Date(),
      where: '',
      whoConducts: '',
      comment: '',
      type: EventTimelineType.Interview
    });
    this.outputChangeTimeline.emit(this.internalTimeLineList);
  }

  addCV() {
    this.internalTimeLineList.unshift(<AttachmentTimeline> {
      comment: '',
      type: EventTimelineType.Attachment
    });
    this.outputChangeTimeline.emit(this.internalTimeLineList);
  }

  addExperience() {
    this.internalTimeLineList.unshift(<ExperienceTimeline> {
      companyName: '',
      dateFrom: new Date(),
      dateTo: new Date(),
      jobPosition: '',
      comment: '',
      type: EventTimelineType.Experience
    });
    this.outputChangeTimeline.emit(this.internalTimeLineList);
  }

  addNote() {
    this.internalTimeLineList.unshift(<NoteTimeline> {
      comment: '',
      type: EventTimelineType.Note
    });
    this.outputChangeTimeline.emit(this.internalTimeLineList);
  }
}
