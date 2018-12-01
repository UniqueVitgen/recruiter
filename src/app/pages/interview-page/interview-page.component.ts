import { Component, OnInit } from '@angular/core';
import {InterviewService} from '../../services/interview/interview.service';
import {InterviewExtended} from '../../classes/interview';
import {VacancyService} from '../../services/vacancy/vacancy.service';
import {CandidateService} from '../../services/candidate/candidate.service';
import {Vacancy} from '../../classes/vacancy';
import {Candidate} from '../../classes/candidate';

@Component({
  selector: 'app-interview-page',
  templateUrl: './interview-page.component.html',
  styleUrls: ['./interview-page.component.scss']
})
export class InterviewPageComponent implements OnInit {
  public mockInterview: InterviewExtended;
  private mockVacancy: Vacancy;
  private mockCandidate: Candidate;

  constructor(private interviewService: InterviewService,
  private vacancyService: VacancyService,
  private candidateService: CandidateService) { }

  ngOnInit() {
    this.vacancyService.get(0).subscribe(vacancyRes => {
      this.mockVacancy = vacancyRes;
      this.candidateService.get(0).subscribe(candidateRes => {
        this.mockCandidate = candidateRes;
        this.interviewService.get(0).subscribe(res => {
          this.mockInterview = res;
          this.mockInterview.vacancy = this.mockVacancy;
          this.mockInterview.candidate = this.mockCandidate;
          console.log(this.mockInterview);
        });
      });
    });
  }

  getInterviews() {
    this.interviewService.getAll().subscribe(res => {
      console.log(res);
    });
  }

}
