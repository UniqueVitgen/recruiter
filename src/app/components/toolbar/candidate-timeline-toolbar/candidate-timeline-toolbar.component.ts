import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {BaseTimeline} from '../../../classes/timeline/base-timeline';
import {EventTimelineType} from '../../../enums/event-timeline-type.enum';
import {CandidateDialogData} from '../../../interfaces/dialog/init/candidate-dialog-data';
import {MatDialog} from '@angular/material';
import {AttachmentCandidateModalComponent} from '../../modals/candidate/attachment-candidate-modal/attachment-candidate-modal.component';
import {BaseDialogResult} from '../../../interfaces/dialog/result/base-dialog-result';
import {Candidate} from '../../../classes/candidate';
import {ExperienceCandidateModalComponent} from '../../modals/candidate/experience-candidate-modal/experience-candidate-modal.component';

import {NoteCandidateModalComponent} from '../../modals/candidate/note-candidate-modal/note-candidate-modal.component';
import {NoteDialogData} from '../../../interfaces/dialog/init/note-dialog-data';
import {Feedback} from '../../../classes/feedback';

@Component({
  selector: 'app-candidate-timeline-toolbar',
  templateUrl: './candidate-timeline-toolbar.component.html',
  styleUrls: ['./candidate-timeline-toolbar.component.scss']
})
export class CandidateTimelineToolbarComponent implements OnChanges {

  @Input() timelineNotes: BaseTimeline[];
  @Input() candidate: Candidate;
  @Output('changeTimeline') outputChangeTimeline = new EventEmitter();
  @Output('clickTimelineItem') outputClickTimelineItem: EventEmitter<EventTimelineType> = new EventEmitter();
  editedCandidate: Candidate;
  internalTimeLineList: BaseTimeline[];

  constructor(private dialog: MatDialog) {
  }

  ngOnChanges() {
    if (this.timelineNotes) {
      this.internalTimeLineList = this.timelineNotes.slice();
    }
    if (this.candidate) {
      this.editedCandidate = Object.assign({}, this.candidate);
    }
  }

  addAssignInterview() {
    this.outputClickTimelineItem.emit(EventTimelineType.Interview);
    // const dialogRef = this.dialog.open(InterviewCandidateModalComponent, {
    //     data: <AttachmentDialogData> {
    //       isEdit: false,
    //       sourceCandidate: this.candidate
    //     }
    //   }
    // );
    // dialogRef.afterClosed().subscribe((res: CandidateDialogResult) => {
    //   if (res) {
    //     console.log('res - ', res);
    //     this.outputChangeTimeline.emit(res.resCandidate);
    //   }
    // });
    // console.log(this.internalTimeLineList);
    // this.internalTimeLineList.unshift(<InterviewTimeline> {
    //   when: new Date(),
    //   where: '',
    //   whoConducts: '',
    //   comment: '',
    //   type: EventTimelineType.Interview
    // });
    // this.outputChangeTimeline.emit(this.internalTimeLineList);
    // const dialogRef = this.dialog.open(InterviewModalComponent, {
    //     data: <InterviewDialogDataInterface> {
    //       sourceCandidate: this.editedCandidate,
    //       fixedCandidate: true
    //     }
    //   }
    // );
    // dialogRef.afterClosed().subscribe((res: BaseDialogResult<Candidate>) => {
    //   if (res) {
    //     console.log('res - ', res);
    //     this.outputChangeTimeline.emit(res.resObject);
    //   }
    // });
  }

  addCV() {
    this.outputClickTimelineItem.emit(EventTimelineType.Attachment);
    // const dialogRef = this.dialog.open(AttachmentCandidateModalComponent, {
    //     data: <CandidateDialogData> {
    //       sourceCandidate: this.editedCandidate
    //     },
    //     disableClose: true
    //   }
    // );
    // dialogRef.afterClosed().subscribe((res: BaseDialogResult<Candidate>) => {
    //   console.log('res', res);
    //   if (res) {
    //     console.log('res - ', res);
    //     this.outputChangeTimeline.emit(res.resObject);
    //   }
    // });
  }

  addExperience() {
    this.outputClickTimelineItem.emit(EventTimelineType.Experience);
    // const dialogRef = this.dialog.open(ExperienceCandidateModalComponent, {
    //     data: <CandidateDialogData> {
    //       sourceCandidate: this.editedCandidate
    //     },
    //     disableClose: true
    //   }
    // );
    // dialogRef.afterClosed().subscribe((res: BaseDialogResult<Candidate>) => {
    //   if (res) {
    //     console.log('res - ', res);
    //     this.outputChangeTimeline.emit(res.resObject);
    //   }
    // });
  }

  addNote() {
    this.outputClickTimelineItem.emit(EventTimelineType.Note);
    // const dialogRef = this.dialog.open(NoteCandidateModalComponent, {
    //     data: <NoteDialogData> {
    //       isEdit: false,
    //       sourceCandidate: this.candidate
    //     }
    //   }
    // );
    // dialogRef.afterClosed().subscribe((res: BaseDialogResult<Feedback>) => {
    //   if (res) {
    //     console.log('res - ', res);
    //     this.outputChangeTimeline.emit(res.resObject);
    //   }
    // });
  }
}
