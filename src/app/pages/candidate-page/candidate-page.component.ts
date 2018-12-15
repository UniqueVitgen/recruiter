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
import {EventNoteWorker} from '../../workers/event-note/event-note.worker';

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
    private eventNoteWorker: EventNoteWorker,
    private candidateService: CandidateService) { }

  ngOnInit() {
    this.route.params
    .subscribe(params => {
      this.id = params['id'];
      this.getCandidate();
      // this.candidateService.get()
      // Defaults to 0 if no query param provided.
    });
  }
  deleteTimelineItem(index: number) {
    const object = this.eventNoteList[index];
    console.log(object);
    if (this.eventNoteWorker.isAttachement(object)) {
      this.candidate.attachments = this.candidate.attachments.filter((attachment => {
        return object.id !== attachment.id;
      }));
    } else if (this.eventNoteWorker.isNote(object)) {

    } else if (this.eventNoteWorker.isExperience(object)) {
      this.candidate.experiences = this.candidate.experiences.filter((attachment => {
        return object.id !== attachment.id;
      }));
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

    } else if (this.eventNoteWorker.isExperience(object)) {
      this.candidate.experiences = this.candidate.experiences.map((attachment) => {
        if (attachment.id === object.id) {
          return object;
        } else {
          return attachment;
        }
      });
    }
    this.candidateService.update(this.candidate).subscribe(resMessage => {
      this.getCandidate();
    });
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

}
