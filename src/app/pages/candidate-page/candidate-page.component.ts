import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { Candidate } from 'src/app/classes/candidate';
import {Notes} from 'src/app/classes/notes';
import {EventNote} from '../../classes/event-note';
import {Interview} from '../../classes/interview';

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

  constructor(
    private route: ActivatedRoute,
    private candidateService: CandidateService) { }

  ngOnInit() {
    this.route.params
    .subscribe(params => {
      this.id = Number(params['id']);
      this.candidateService.get(this.id).subscribe(res => {
        this.candidate = res;
        const interviewers = <Interview[]> [
          {
            vacancyId: 0,
            candidateId: 0,
            planDate: new Date().toDateString(),
            factDate: new Date().toDateString()
          }
          ];
        const noteList = <Notes[]> [
          {
            date: new Date().toDateString(),
            interviewer: 'me',
            noteText: 'fadsfeqwgegqewgewgewgew'
          }
        ];
        this.eventNoteList = [].concat(this.candidate.experiences).concat(this.candidate.attachments)
          .concat(interviewers)
          .concat(noteList);
        console.log(this.eventNoteList);
        console.log('res', res);
      });
      // this.candidateService.get()
      // Defaults to 0 if no query param provided.
    });
  }

}
