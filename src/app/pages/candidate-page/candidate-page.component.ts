import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { Candidate } from 'src/app/classes/candidate';
import {Notes} from 'src/app/classes/notes';

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

  constructor(
    private route: ActivatedRoute,
    private candidateService: CandidateService) { }

  ngOnInit() {
    this.route.params
    .subscribe(params => {
      this.id = Number(params['id']);
      this.candidateService.get(this.id).subscribe(res => {
        this.candidate = res;
        console.log('res', res);
      });
      // this.candidateService.get()
      // Defaults to 0 if no query param provided.
    });
  }

}
