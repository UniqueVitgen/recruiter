import {Component, EventEmitter, OnInit} from '@angular/core';
import {InterviewService} from '../../services/interview/interview.service';
import {Interview, InterviewExtended} from '../../classes/interview';
import {VacancyService} from '../../services/vacancy/vacancy.service';
import {CandidateService} from '../../services/candidate/candidate.service';
import {Vacancy} from '../../classes/vacancy';
import {Candidate} from '../../classes/candidate';
import {TranslateWorker} from '../../workers/translate/translate.worker';
import {ActivatedRoute, Router} from '@angular/router';
import {CandidateWorker} from '../../workers/candidate/candidate.worker';
import {Attachment} from '../../classes/attachment';
import {InterviewModalComponent} from '../../components/modals/interview/interview-modal/interview-modal.component';
import {InterviewDialogDataInterface} from '../../interfaces/dialog/init/interview-dialog-data-interface';
import {MatDialog} from '@angular/material';
import {BaseDialogResult} from '../../interfaces/dialog/result/base-dialog-result';
import {Location} from '@angular/common';
import {DevFeedbackService} from '../../services/dev-feedback/dev-feedback.service';
import {DevFeedback} from '../../classes/dev-feedback';
import {Subscription} from 'rxjs';
import {DeleteInterviewModalComponent} from '../../components/modals/interview/delete-interview-modal/delete-interview-modal.component';
import {InterviewerService} from '../../services/interviewer/interviewer.service';
import {Interviewer} from '../../classes/interviewer';


@Component({
  selector: 'app-interview-page',
  templateUrl: './interview-page.component.html',
  styleUrls: ['./interview-page.component.scss']
})
export class InterviewPageComponent implements OnInit {
  public interview: InterviewExtended;
  private id: number;
  photo: Attachment;
  photoUrl: string;
  isFeedbackEdited: boolean;
  feedback: DevFeedback;
  interviewers: Interviewer[];

  constructor(private interviewService: InterviewService,
  private interviewerService: InterviewerService,
  private route: ActivatedRoute,
  private translateWorker: TranslateWorker,
  private vacancyService: VacancyService,
  private devFeedbackService: DevFeedbackService,
  private candidateWorker: CandidateWorker,
              private location: Location,
              private dialog: MatDialog,
              private router: Router,
  private candidateService: CandidateService) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.id = params['id'];
        this.getInterview();
        this.getInterviewers();
        // this.candidateService.get()
        // Defaults to 0 if no query param provided.
      });
    // this.vacancyService.getAll().subscribe(vacanciesRes => {
    //   this.mockVacancy = vacanciesRes[0];
    //   this.candidateService.getAll().subscribe(candidatesRes => {
    //     this.mockCandidate = candidatesRes[0];
    //     this.interviewService.get(0).subscribe(res => {
    //       this.mockInterview = res;
    //       this.mockInterview.vacancy = this.mockVacancy;
    //       this.mockInterview.candidate = this.mockCandidate;
    //       console.log(this.mockInterview);
    //     });
    //   });
    // });
  }

  getInterview(): Subscription {
    return this.interviewService.get(this.id).subscribe(res => {
      this.interview = res;
      this.photo = this.candidateWorker.findPhoto(this.interview.candidate);
      this.photoUrl = this.candidateWorker.generatePhotoUrl(this.photo);
      this.candidateWorker.generatePhotoUrl(this.photo);
      this.devFeedbackService.getByInterview(this.interview).subscribe(resFeedback => {
          if (resFeedback) {
            this.isFeedbackEdited = true;
            this.feedback = resFeedback;
          } else {
            this.isFeedbackEdited = false;
            this.feedback = new DevFeedback(this.interview);
            console.log('feedback', this.feedback);
          }
      });
      console.log(res);
    });
  }
  getInterviewers(): Subscription {
    return this.interviewerService.getAll().subscribe(resInterviewers => {
      this.interviewers = resInterviewers;
    });
  }
  clickEdit(interview: InterviewExtended): void {
    console.log('change event', event);
    const dialogRef = this.dialog.open(InterviewModalComponent, {
      data: <InterviewDialogDataInterface> {
        sourceDate: new Date(interview.planDate),
        sourceEndDate: new Date(interview.planEndDate),
        fixedCandidate: false,
        isEdit: true,
        sourceCandidate: interview.candidate,
        sourceInterview: interview,
        sourceInterviewers: this.interviewers
      }
    });
    dialogRef.componentInstance.outputClickSave.subscribe((resInterview: BaseDialogResult<InterviewExtended>) => {
      console.log(resInterview);
      // if (resInterview.isEdit) {
        this.updateInterview(resInterview.resObject).add(() => {
          this.getInterview().add(() => {
            dialogRef.close();
          });
        });
      // }
    });
    dialogRef.componentInstance.outputClickDelete.subscribe((resInterview: BaseDialogResult<InterviewExtended>) => {
      // this.deleteInterview(resInterview.resObject).add(() => {
      //   this.getInterview().add(() => {
      //     dialogRef.close();
      //   });
      // });
      this.clickDelete(resInterview.resObject);
    });
  }
  updateInterview(interview: InterviewExtended): Subscription {
    return this.interviewService.update(interview).subscribe(resInterview => {
    });
  }
  clickDelete(interview: InterviewExtended) {
    const dialogRef = this.dialog.open(DeleteInterviewModalComponent, {
      width: '400px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.deleteInterview(this.interview);
        // this.candidateService.delete(candidate.id).subscribe(res => {
        //   this.getAll();
        // });
      }
    });
  }
  deleteInterview(interview: InterviewExtended): Subscription {
    return this.interviewService.delete(interview).subscribe(resInterview => {
      this.location.back();
    });

  }
  addDevFeedback(event) {
    this.devFeedbackService.add(event).subscribe(res => {
      this.getInterview();
    });
  }
  clickDeleteFeedback(event) {
    this.devFeedbackService.delete(event).subscribe(() => {
      this.getInterview();
    });
  }
  changeDevFeedback(event) {
    console.log(event);
    if (this.isFeedbackEdited) {
      this.devFeedbackService.update(event).subscribe(res => {
        // this.getInterview();
      });
    }
  }
}
