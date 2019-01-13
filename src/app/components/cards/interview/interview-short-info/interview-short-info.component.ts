import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {InterviewExtended} from '../../../../classes/interview';
import {CandidateWorker} from '../../../../workers/candidate/candidate.worker';
import {UserWorker} from '../../../../workers/user/user.worker';
import {DateTimeWorker} from '../../../../workers/date-time/date-time.worker';
import {TranslateWorker} from '../../../../workers/translate/translate.worker';
import {Router} from '@angular/router';
import {FileWorker} from '../../../../workers/file/file.worker';

@Component({
  selector: 'app-interview-short-info',
  templateUrl: './interview-short-info.component.html',
  styleUrls: ['./interview-short-info.component.scss']
})
export class InterviewShortInfoComponent implements OnInit, OnChanges {
  @Input() interview: InterviewExtended;
  @Input() buttonEdit: boolean;
  @Output('clickEdit') outputClickEdit: EventEmitter<InterviewExtended> = new EventEmitter();
  @Output('clickDelete') outputClickDelete: EventEmitter<InterviewExtended> = new EventEmitter();
  public viewOfDate: string;

  constructor(public userWorker: UserWorker,
              private dateTimeWorker: DateTimeWorker,
              private fileWorker: FileWorker,
              public candidateWorker: CandidateWorker,
              private translateWorker: TranslateWorker) {
  }

  ngOnInit() {
    this.translateWorker.changeValue.subscribe(res => {
      const date = new Date (this.interview.planDate);
      // date.setHours(date.getUTCHours());
      // console.log(date.getUTCHours());
      this.viewOfDate = this.dateTimeWorker.getDateWithTime(date);
    });
  }
  clickEdit(): void {
    this.outputClickEdit.emit(this.interview);
  }
  clickDelete(): void {
    this.outputClickDelete.emit(this.interview);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.interview) {
      const date = new Date (this.interview.planDate);
      // console.log(date.getUTCHours());
      // date.setHours(date.getUTCHours());
      this.viewOfDate = this.dateTimeWorker.getDateWithTime(date);
    }
  }
}
