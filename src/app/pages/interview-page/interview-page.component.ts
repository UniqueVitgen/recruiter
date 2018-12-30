import { Component, OnInit } from '@angular/core';
import {InterviewService} from '../../services/interview/interview.service';
import {InterviewExtended} from '../../classes/interview';
import {VacancyService} from '../../services/vacancy/vacancy.service';
import {CandidateService} from '../../services/candidate/candidate.service';
import {Vacancy} from '../../classes/vacancy';
import {Candidate} from '../../classes/candidate';
import {TranslateWorker} from '../../workers/translate/translate.worker';
import {ActivatedRoute} from '@angular/router';
import {CandidateWorker} from '../../workers/candidate/candidate.worker';
import {Attachment} from '../../classes/attachment';
import {InterviewModalComponent} from '../../components/modals/interview/interview-modal/interview-modal.component';
import {InterviewDialogData} from '../../interfaces/dialog/init/interview-dialog-data';
import {MatDialog} from '@angular/material';
import {BaseDialogResult} from '../../interfaces/dialog/result/base-dialog-result';
import {Location} from '@angular/common';


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

  constructor(private interviewService: InterviewService,
  private route: ActivatedRoute,
  private translateWorker: TranslateWorker,
  private vacancyService: VacancyService,
  private candidateWorker: CandidateWorker,
              private location: Location,
              private dialog: MatDialog,
  private candidateService: CandidateService) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.id = params['id'];
        this.getInterview();
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

  getInterview() {
    this.interviewService.get(this.id).subscribe(res => {
      this.interview = res;
      this.photo = this.candidateWorker.findPhoto(this.interview.candidate);
      this.photoUrl = this.candidateWorker.generatePhotoUrl(this.photo);
      this.candidateWorker.generatePhotoUrl(this.photo);
      console.log(res);
    });
  }
  clickEdit(interview: InterviewExtended) {
    console.log('change event', event);
    const dialogRef = this.dialog.open(InterviewModalComponent, {
      data: <InterviewDialogData> {
        sourceDate: new Date(interview.planDate),
        fixedCandidate: false,
        isEdit: true,
        sourceCandidate: interview.candidate,
        sourceInterview: interview
      }
    });
    dialogRef.afterClosed().subscribe((res: BaseDialogResult<InterviewExtended>) => {
      if (res.delete) {
        this.location.back();
      } else {
        this.getInterview();
      }
    });

  }

}
