import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ExperienceTimeline} from '../../../../classes/timeline/experience-timeline';
import {DateTimeWorker} from '../../../../workers/date-time/date-time.worker';
import {TranslateWorker} from '../../../../workers/translate/translate.worker';
import {PositionService} from '../../../../services/position/position.service';
import {PositionModel} from '../../../../classes/position-model';
import {TeamService} from '../../../../services/team/team.service';
import {Team} from '../../../../classes/team';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserWorker} from '../../../../workers/user/user.worker';
import {Candidate} from '../../../../classes/candidate';

@Component({
  selector: 'app-experience-candidate-timeline-item',
  templateUrl: './experience-candidate-timeline-item.component.html',
  styleUrls: ['./experience-candidate-timeline-item.component.scss']
})
export class ExperienceCandidateTimelineItemComponent implements OnInit, OnChanges {
  @Input() experience: ExperienceTimeline;
  @Input() candidate: Candidate;
  @Output() changeCandidate: EventEmitter<any> = new EventEmitter();
  @Output() changeEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  public experienceForm: FormGroup;
  teams: Team[];
  positions: PositionModel[];
  editedExperience: ExperienceTimeline;
  viewOfDate: string;
  isSaved: boolean = true;
  visible: boolean;
  public maxDate: Date;
  public minDate: Date;
  public minDateWithBirthday: Date;
  constructor(public dateTimeWorker: DateTimeWorker,
              private translateWorker: TranslateWorker,
              private fb: FormBuilder,
              private userWorker: UserWorker,
              private positionService: PositionService,
              private teamService: TeamService) { }

  ngOnInit() {
    this.minDate = new Date(this.userWorker.generateRequiredStartDate().setFullYear(
      this.userWorker.generateRequiredStartDate().getFullYear() + 18,
            this.userWorker.generateRequiredStartDate().getMonth(),
            this.userWorker.generateRequiredStartDate().getDay()));
    this.maxDate = this.dateTimeWorker.getTodayStart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isSaved) {
      // this.editedExperience = Object.assign({}, this.experience);
      this.editedExperience = this.experience;
      this.experienceForm = this.fb.group({
        companyName: [this.editedExperience.companyName.name, Validators.compose([Validators.required])],
        dateFrom: [this.editedExperience.dateFrom, Validators.compose([Validators.required])],
        dateTo: [this.editedExperience.dateTo, Validators.compose([Validators.required])],
        jobPosition: [this.editedExperience.jobPosition.name, Validators.compose([Validators.required])]
      });
      this.viewOfDate = this.dateTimeWorker.getDateWithTime(this.editedExperience.createdAt);
      this.translateWorker.changeValue.subscribe((res) => {
        this.viewOfDate = this.dateTimeWorker.getDateWithTime(this.editedExperience.createdAt);
      });
      this.getPositions();
      this.getTeams();
      this.getCandidateBirthday();
    }
  }
  getPositions() {
    this.positionService.getAll().subscribe(resPositions => {
      this.positions = resPositions;
    });
  }
  getTeams() {
    this.teamService.getAll().subscribe(resTeams => {
      this.teams = resTeams;
    });
  }

  getCandidateBirthday() {
    this.minDateWithBirthday = new Date(new Date(this.candidate.birthday).setFullYear(
      new Date(this.candidate.birthday).getFullYear() + 18,
            new Date(this.candidate.birthday).getMonth(),
            new Date(this.candidate.birthday).getDay()));
  }

  onFocusoutAnyInput() {
    console.log(this.experienceForm);
    this.isSaved = this.experienceForm.valid;
    console.log('after saved', this.isSaved);
    for (const field in this.experienceForm.controls) {
      const control = this.experienceForm.get(field);
      if (control.valid) {
        if (field === 'jobPosition' || field === 'companyName') {
          this.experience[field].name = control.value;
        } else {
          this.experience[field] = control.value;
        }
      }
    }
    this.changeCandidate.emit(this.experience);
    this.getCandidateBirthday();
    // this.form.controls
    // console.log(value);
    // if (value) {
    //   console.log('exp', this.editedExperience);
    //   this.changeCandidate.emit(this.editedExperience);
    // }
  }
  delete() {
    this.deleteEvent.emit(this.editedExperience);
  }
  change() {
    this.changeEvent.emit(this.editedExperience);
  }

}
