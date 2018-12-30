import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { Candidate } from 'src/app/classes/candidate';
import {EventNote} from '../../classes/event-note';
import {Interview} from '../../classes/interview';
import {EventNoteWorker} from '../../workers/event-note/event-note.worker';
import {FeedbackService} from '../../services/feedback/feedback.service';
import {InterviewService} from '../../services/interview/interview.service';
import {AttachmentForm} from '../../classes/html/attachment-form';
import {AttachmentType} from '../../enums/attachment-type.enum';
import {ImageCropperAvatarComponent} from '../../components/modals/candidate/image-cropper-avatar/image-cropper-avatar.component';
import {MatDialog} from '@angular/material';
import {AttachmentCandidateModalComponent} from '../../components/modals/candidate/attachment-candidate-modal/attachment-candidate-modal.component';
import {CandidateDialogData} from '../../interfaces/dialog/init/candidate-dialog-data';
import {BaseDialogResult} from '../../interfaces/dialog/result/base-dialog-result';

@Component({
  selector: 'app-candidate-page',
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.scss']
})
export class CandidatePageComponent implements OnInit {
  id: number;
  candidate: Candidate;
  notes = { interviewer: 'Вася',
  date: '1',
  noteText: '1111111111111111111111111111111111111111111111111111111111111111111111111'};
  eventNoteList: EventNote[];
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private eventNoteWorker: EventNoteWorker,
    private feedbackService: FeedbackService,
    private candidateService: CandidateService,
    private interviewService: InterviewService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.route.params
    .subscribe(params => {
      this.id = params['id'];
      this.getCandidate();
      // this.candidateService.get()
      // Defaults to 0 if no query param provided.
    });
  }
  clickAvatar() {
    const dialogRef = this.dialog.open(ImageCropperAvatarComponent, {
        data: <CandidateDialogData> {
          sourceCandidate: this.candidate
        },
        disableClose: true
      }
    );
    dialogRef.afterClosed().subscribe((res: BaseDialogResult<Candidate>) => {
      this.getCandidate();
      console.log('res', res);
      if (res) {
        console.log('res - ', res);
        //this.outputChangeTimeline.emit(res.resObject);
      }
    });
  }

  selectFile(event) {
    console.log(event.target.files[0]);
    const attachment: AttachmentForm = {
      attachmentType: AttachmentType.PHOTO,
      file: event.target.files[0]
    };
    this.candidateService.uploadAttachment(this.candidate, attachment).subscribe(res => {
      this.getCandidate();
    });
    // this.editedAttachment.file = <File>event.target.files[0];
  }
  deleteTimelineItem(index: number) {
    const object = this.eventNoteList[index];
    console.log(object);
    if (this.eventNoteWorker.isAttachement(object)) {
      this.candidate.attachments = this.candidate.attachments.filter((attachment => {
        return object.id !== attachment.id;
      }));
    } else if (this.eventNoteWorker.isImg(object)) {
      this.candidate.attachments = this.candidate.attachments.filter((attachment => {
        return object.id !== attachment.id;
      }));
    } else if (this.eventNoteWorker.isNote(object)) {
      this.feedbackService.delete(<any>object).subscribe(res => {
        this.getCandidate();
      });
    }
    else if (this.eventNoteWorker.isExperience(object)) {
      this.candidate.experiences = this.candidate.experiences.filter((attachment => {
        return object.id !== attachment.id;
      }));
    } else if (this.eventNoteWorker.isInterview(object)) {
        this.interviewService.delete(<Interview>object).subscribe( res => { this.getCandidate(); });
      }
    this.candidateService.update(this.candidate).subscribe(resMessage => {
      this.getCandidate();
    });
  }
  changeTimelineItem(object: any) {
    if (this.eventNoteWorker.isAttachement(object)) {
      this.candidate.attachments = this.candidate.attachments.map((attachment) => {
        if (attachment.id === object.id) {
          return object;
        } else {
          return attachment;
        }
      });
    } else if (this.eventNoteWorker.isNote(object)) {
      this.feedbackService.update(object).subscribe(res => {
        // this.getCandidate();
      });
    } else if (this.eventNoteWorker.isExperience(object)) {
      this.candidate.experiences = this.candidate.experiences.map((attachment) => {
        if (attachment.id === object.id) {
          return object;
        } else {
          return attachment;
        }
      });
    } else if (this.eventNoteWorker.isInterview(object)) {
      this.interviewService.update(object).subscribe( res => {
        // this.getCandidate();
      });
    }
    this.candidateService.update(this.candidate).subscribe(resMessage => {
      this.getCandidate();
    });
  }
  addTimelineItem(candidate: Candidate) {
    this.getCandidate();
  }
  getCandidate() {
    this.candidateService.get(this.id).subscribe(res => {
      this.candidate = res;
      this.candidateService.getTimeline(this.candidate).subscribe(resTimeline => {
        this.eventNoteList = resTimeline;
      });

      // const interviewers = <InterviewTimeline[]> [
      //   {
      //     when: new Date(),
      //     where: '',
      //     whoConducts: '',
      //     comment: '',
      //     type: EventTimelineType.Interview
      //   }
      //   ];
      // const noteList = <NoteTimeline[]> [
      //   {
      //     comment: '',
      //     type: EventTimelineType.Note
      //   }
      // ];
      // .concat(interviewers)
      // .concat(noteList);
      console.log(this.eventNoteList);
      console.log('res', res);
    });
  }
  // goToInterviewPage(object: any) {
  //   if (this.eventNoteWorker.isInterview(object)) {
  //     this.router.navigate(['interview', this.candidate.]);
  //   }
  // }

}
