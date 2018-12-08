import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { Candidate } from 'src/app/classes/candidate';
import {Notes} from 'src/app/classes/notes';
import {EventNote} from '../../classes/event-note';
import {Interview} from '../../classes/interview';
import {BaseTimeline} from '../../classes/timeline/base-timeline';
import {InterviewTimeline} from '../../classes/timeline/interview-timeline';
import {EventTimelineType} from '../../enums/event-timeline-type.enum';
import {NoteTimeline} from '../../classes/timeline/note-timeline';

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
  eventNoteList: BaseTimeline[];

  constructor(
    private route: ActivatedRoute,
    private candidateService: CandidateService) { }

  ngOnInit() {
    this.route.params
    .subscribe(params => {
      this.id = params['id'];
      this.candidateService.get(this.id).subscribe(res => {
        this.candidate = res;
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
        this.eventNoteList = []; //.concat(this.candidate.experiences).concat(this.candidate.attachments)
          //.concat(interviewers)
          //.concat(noteList);
        console.log(this.eventNoteList);
        console.log('res', res);
      });
      // this.candidateService.get()
      // Defaults to 0 if no query param provided.
    });
  }

}
