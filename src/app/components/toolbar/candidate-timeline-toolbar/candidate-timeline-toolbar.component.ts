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
import {BaseDialogResult} from '../../../interfaces/dialog/result/base-dialog-result';
import {Attachment} from '../../../classes/attachment';
import {Candidate} from '../../../classes/candidate';
import {AttachmentDialogData} from '../../../interfaces/dialog/init/attachment-dialog-data';
import {ExperienceCandidateModalComponent} from '../../modals/candidate/experience-candidate-modal/experience-candidate-modal.component';

@Component({
  selector: 'app-candidate-timeline-toolbar',
  templateUrl: './candidate-timeline-toolbar.component.html',
  styleUrls: ['./candidate-timeline-toolbar.component.scss']
})
export class CandidateTimelineToolbarComponent implements OnChanges {

  @Input() timelineNotes: BaseTimeline[];
  @Input() candidate: Candidate;
  @Output('changeTimeline') outputChangeTimeline = new EventEmitter();
  editedCandidate: Candidate;
  internalTimeLineList: BaseTimeline[];
  constructor(private dialog: MatDialog) { }

  ngOnChanges() {
    if (this.timelineNotes) {
      this.internalTimeLineList = this.timelineNotes.slice();
    }
    if (this.candidate) {
      this.editedCandidate = Object.assign({}, this.candidate);
    }
  }

  addAssignInterview() {

    // const dialogRef = this.dialog.open(AttachmentCandidateModalComponent, {
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
  }

  addCV() {
    const dialogRef = this.dialog.open(AttachmentCandidateModalComponent, {
        data: <CandidateDialogData> {
          sourceCandidate: this.editedCandidate
        }
      }
    );
    dialogRef.afterClosed().subscribe((res: BaseDialogResult<Candidate>) => {
      if (res) {
        console.log('res - ', res);
        this.outputChangeTimeline.emit(res.resObject);
      }
    });
    // this.internalTimeLineList.unshift(<AttachmentTimeline> {
    //   comment: '',
    //   type: EventTimelineType.Attachment
    // });
    // this.outputChangeTimeline.emit(this.internalTimeLineList);
  }

  addExperience() {
    const dialogRef = this.dialog.open(ExperienceCandidateModalComponent, {
        data: <CandidateDialogData> {
          sourceCandidate: this.editedCandidate
        }
      }
    );
    dialogRef.afterClosed().subscribe((res: BaseDialogResult<Candidate>) => {
      if (res) {
        console.log('res - ', res);
        this.outputChangeTimeline.emit(res.resObject);
      }
    });
  }

  addNote() {
    this.internalTimeLineList.unshift(<NoteTimeline> {
      comment: '',
      type: EventTimelineType.Note
    });
    this.outputChangeTimeline.emit(this.internalTimeLineList);
  }
}
