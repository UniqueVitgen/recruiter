import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {InterviewExtended} from '../../../../classes/interview';
import {CandidateWorker} from '../../../../workers/candidate/candidate.worker';
import {UserWorker} from '../../../../workers/user/user.worker';
import {DateTimeWorker} from '../../../../workers/date-time/date-time.worker';
import {TranslateWorker} from '../../../../workers/translate/translate.worker';
import {Router} from '@angular/router';

@Component({
  selector: 'app-interview-short-info',
  templateUrl: './interview-short-info.component.html',
  styleUrls: ['./interview-short-info.component.scss']
})
export class InterviewShortInfoComponent implements OnInit, OnChanges {
  @Input() interview: InterviewExtended;
  @Input() buttonEdit: boolean;
  @Output('clickEdit') outputClickEdit: EventEmitter<InterviewExtended> = new EventEmitter();
  public viewOfDate: string;

  constructor(public userWorker: UserWorker,
              private dateTimeWorker: DateTimeWorker,
              private translateWorker: TranslateWorker) {
  }

  ngOnInit() {
    this.translateWorker.changeValue.subscribe(res => {
      this.viewOfDate = this.dateTimeWorker.getDateWithTime(new Date(this.interview.planDate));
    });
  }
  clickEdit(): void {
    this.outputClickEdit.emit(this.interview);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.interview) {
      this.viewOfDate = this.dateTimeWorker.getDateWithTime(new Date(this.interview.planDate));
    }
  }
}
