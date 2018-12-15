import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {InterviewTimeline} from '../../../classes/timeline/interview-timeline';
import {BaseTimeline} from '../../../classes/timeline/base-timeline';
import {AttachmentTimeline} from '../../../classes/timeline/attachment-timeline';
import {ExperienceTimeline} from '../../../classes/timeline/experience-timeline';
import {NoteTimeline} from '../../../classes/timeline/note-timeline';
import {EventTimelineType} from '../../../enums/event-timeline-type.enum';
import {CandidateModalComponent} from '../../modals/candidate/candidate-modal/candidate-modal.component';
import {CandidateDialogData} from '../../../interfaces/dialog/init/candidate-dialog-data';
import {CandidateDialogResult} from '../../../interfaces/dialog/result/candidate-dialog-result';
import {MatDialog} from '@angular/material';
import {AttachmentCandidateModalComponent} from '../../modals/candidate/attachment-candidate-modal/attachment-candidate-modal.component';

@Component({
  selector: 'app-candidate-timeline-toolbar',
  templateUrl: './candidate-timeline-toolbar.component.html',
  styleUrls: ['./candidate-timeline-toolbar.component.scss']
})
export class CandidateTimelineToolbarComponent implements OnChanges {

  @Input() timelineNotes: BaseTimeline[];
  @Output('changeTimeline') outputChangeTimeline = new EventEmitter();
  internalTimeLineList: BaseTimeline[];
  constructor(private dialog: MatDialog) { }

  ngOnChanges() {
    this.internalTimeLineList = this.timelineNotes.slice();
  }

  addAssignInterview() {

    const dialogRef = this.dialog.open(AttachmentCandidateModalComponent, {
        data: <CandidateDialogData> {
        }
      }
    );
    dialogRef.afterClosed().subscribe((res: CandidateDialogResult) => {
      if (res) {
        console.log('res - ', res);
        this.outputChangeTimeline.emit(res.resCandidate);
      }
    });
    // console.log(this.internalTimeLineList);
    // this.internalTimeLineList.unshift(<InterviewTimeline> {
    //   when: new Date(),
    //   where: '',
    //   whoConducts: '',
    //   comment: '',
    //   type: EventTimelineType.Interview
    // });
    this.outputChangeTimeline.emit(this.internalTimeLineList);
  }

  addCV() {
    const dialogRef = this.dialog.open(AttachmentCandidateModalComponent, {
        data: <CandidateDialogData> {
        }
      }
    );
    dialogRef.afterClosed().subscribe((res: CandidateDialogResult) => {
      if (res) {
        console.log('res - ', res);
        this.outputChangeTimeline.emit(res.resCandidate);
      }
    });
    // this.internalTimeLineList.unshift(<AttachmentTimeline> {
    //   comment: '',
    //   type: EventTimelineType.Attachment
    // });
    // this.outputChangeTimeline.emit(this.internalTimeLineList);
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
