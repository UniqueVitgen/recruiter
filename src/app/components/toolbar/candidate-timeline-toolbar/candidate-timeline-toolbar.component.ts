
import {Component, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {EventNote} from '../../../classes/event-note';
import {Attachment} from '../../../classes/attachment';
import {Interview} from '../../../classes/interview';
import {AttachmentType} from '../../../enums/attachment-type.enum';
import {CandidateExperience} from '../../../classes/candidate-experience';
import {Project} from '../../../classes/project';
import {Team} from '../../../classes/team';
import {Notes} from '../../../classes/notes';

@Component({
  selector: 'app-candidate-timeline-toolbar',
  templateUrl: './candidate-timeline-toolbar.component.html',
  styleUrls: ['./candidate-timeline-toolbar.component.scss']
})
export class CandidateTimelineToolbarComponent implements OnChanges {

  @Input() timelineNotes: EventNote[];
  @Output('changeTimeline') outputChangeTimeline = new EventEmitter();
  internalTimeLineList: EventNote[];
  constructor() { }

  ngOnChanges() {
    this.internalTimeLineList = this.timelineNotes.slice();
  }

  addAssignInterview() {
    console.log(this.internalTimeLineList);
    this.internalTimeLineList.unshift(<Interview> {
      candidateId: 0,
      vacancyId: 0,
      planDate: '',
      factDate: ''
    });
    this.outputChangeTimeline.emit(this.internalTimeLineList);

  }

  addCV() {
    this.internalTimeLineList.unshift(<Attachment> {
      attachmentType: AttachmentType.CV,
      filePath: ''
    });
    this.outputChangeTimeline.emit(this.internalTimeLineList);
  }

  addExperience() {
    this.internalTimeLineList.unshift(<CandidateExperience> {
      dateFrom: new Date().toDateString(),
      dateTo: new Date().toDateString(),
      jobDescription: Project,
      jobPosition: '',
      companyName: Team
    });
    this.outputChangeTimeline.emit(this.internalTimeLineList);
  }

  addNote() {
    this.internalTimeLineList.unshift(<Notes> {
      interviewer: '',
      date: new Date().toDateString(),
      noteText: '12'
    });
    this.outputChangeTimeline.emit(this.internalTimeLineList);
  }
}
