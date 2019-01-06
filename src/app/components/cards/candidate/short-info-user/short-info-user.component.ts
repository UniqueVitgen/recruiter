import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Candidate} from 'src/app/classes/candidate';
import {MatDialog, MatSelect} from '@angular/material';
import {NameCandidateModalComponent} from '../../../modals/candidate/name-candidate-modal/name-candidate-modal.component';
import {StatusCandidateModalComponent} from '../../../modals/candidate/status-candidate-modal/status-candidate-modal.component';
import {CandidateWorker} from '../../../../workers/candidate/candidate.worker';
import {ContactDetails} from '../../../../classes/contact-details';
import {CandidateService} from '../../../../services/candidate/candidate.service';
import {ContactType} from '../../../../enums/contact-type.enum';
import {ArrayWorker} from '../../../../workers/array/array.worker';
import {StringWorker} from '../../../../workers/string/string.worker';
import {CandidateContactInput} from '../../../../classes/html/candidate-contact-input';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegexpConst} from '../../../../const/regexp.const';
import {MaskConst} from '../../../../const/mask.const';
import {CandidateState} from '../../../../enums/candidate-state.enum';
import {EnumWorker} from '../../../../workers/enum/enum.worker';
import {Attachment} from '../../../../classes/attachment';
import {AttachmentType} from '../../../../enums/attachment-type.enum';
import {ReplaySubject, Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {Vacancy} from '../../../../classes/vacancy';
import {PositionModel} from '../../../../classes/position-model';
import {TypeCheckingWorker} from '../../../../workers/type-checking/type-checking.worker';
import {PositionService} from '../../../../services/position/position.service';
import {SearchWorker} from '../../../../workers/search/search.worker';


@Component({
  selector: 'app-short-info-user',
  templateUrl: './short-info-user.component.html',
  styleUrls: ['./short-info-user.component.scss']
})
export class ShortInfoUserComponent implements OnInit, OnDestroy, OnChanges {
  @Input() candidate: Candidate;
  @Input() readonly: boolean;
  @Input() haveHoverEffectOnAvatar: boolean;
  @Input() isEditIconOnAvatar: boolean;
  @Input() vacancies: Vacancy[];
  @Output('editCandidate') outputEditCandidate: EventEmitter<Candidate> = new EventEmitter();
  @Output('clickAvatar') outputClickAvatar: EventEmitter<Candidate> = new EventEmitter();
  public editedCandidate: Candidate;
  public candidateForm: FormGroup;
  public positions: PositionModel[];
  public selectedPositions: PositionModel[];
  tests: CandidateContactInput[] ;
  MaskConst = MaskConst;
  setStates: string[];
  photo: Attachment;
  isSaved: boolean = true;
  isSavedCandidate: boolean = true;

  constructor(public dialog: MatDialog,
              private candidateSerivce: CandidateService,
              private positionService: PositionService,
              public candidateWorker: CandidateWorker,
              private stringWorker: StringWorker,
              private searchWorker: SearchWorker,
              private arrayWorker: ArrayWorker,
              public typeCheckingWorker: TypeCheckingWorker,
              private fb: FormBuilder,
              public  enumWorker: EnumWorker) { }


  ngOnInit() {

    this.setStates = this.enumWorker.getValuesFromEnum(CandidateState);

  }

  ngOnDestroy() {
  }
  clickAvatar() {
    this.outputClickAvatar.emit(this.editedCandidate);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('candidate', this.editedCandidate, this.isSavedCandidate);
    if (this.isSavedCandidate) {
      this.editedCandidate = this.typeCheckingWorker.parseObject(this.candidate);
      // if (this.editedCandidate.position == null) {this.editedCandidate.position = new PositionModel(); }
      console.log('editedCandidate -', this.editedCandidate);
      this.candidateForm = this.fb.group({
        name: [this.editedCandidate.name, Validators.compose([Validators.required, Validators.pattern(RegexpConst.LATIN_OR_CYRILIC_NAME)])],
        surname: [this.editedCandidate.surname, Validators.compose([Validators.required, Validators.pattern(RegexpConst.LATIN_OR_CYRILIC_NAME)])],
        position: [this.editedCandidate.position ? this.editedCandidate.position.name : ''],
        status: [this.editedCandidate.candidateState.name]
      });
    }
    if (this.isSaved) {
      this.initContacts();
    }
    this.photo = this.candidateWorker.findPhoto(this.editedCandidate);
    this.getPositions();
    console.log('photo', this.photo);
  }
  initContacts() {
    this.tests = [
      {have: this.candidateWorker.haveEmail(this.editedCandidate),
        value: ContactType.EMAIL,
        methodName: 'getEmailObject',
        control: new FormControl('', Validators.compose([Validators.pattern(RegexpConst.EMAIL), Validators.required]))
      },
      {have: this.candidateWorker.haveSkype(this.editedCandidate),
        value: ContactType.SKYPE, methodName: 'getSkypeObject',
        control: new FormControl('', Validators.compose([Validators.required]))},
      {have: this.candidateWorker.havePhone(this.editedCandidate),
        value: ContactType.PHONE,
        methodName: 'getPhoneObject',
        control: new FormControl('', Validators.compose([Validators.pattern(RegexpConst.BELLARUSSIAN_PHONE), Validators.required]))
      }
    ];
    console.log(this.tests);
    if (this.tests[0].have) {
      this.tests[0].object = this.candidateWorker.getEmailObject(this.editedCandidate);
      this.tests[0].control.setValue(this.tests[0].object.contactDetails);
    }
    if (this.tests[1].have) {
      this.tests[1].object = this.candidateWorker.getSkypeObject(this.editedCandidate);
      this.tests[1].control.setValue(this.tests[1].object.contactDetails);
    }
    if (this.tests[2].have) {
      this.tests[2].object = this.candidateWorker.getPhoneObject(this.editedCandidate);
      this.tests[2].control.setValue(this.tests[2].object.contactDetails);
    }
  }
  getPositions() {
    this.positionService.getAll().subscribe((resPositions: PositionModel[]) => {
      this.positions = resPositions;
      this.selectedPositions = resPositions;
    });
  }
  changePosition() {
    this.selectedPositions = this.searchWorker.searchObject(this.editedCandidate.position, this.positions, 'name');
  }
  changeContactProperty(value: CandidateContactInput) {
    console.log(value);
    console.log('tests', this.tests);
    if (value.have) {
      if (this.candidateWorker[value.methodName](this.editedCandidate) == null) {
        let skypeObject: ContactDetails;
        if (value.object) {
          skypeObject = value.object;
        } else {
          skypeObject = {
            contactType:  value.value,
            contactDetails: ''
          };
        }
        if ((!this.tests[0].have || this.tests[0].control.valid) &&
          (!this.tests[1].have || this.tests[1].control.valid) &&
          (!this.tests[2].have || this.tests[2].control.valid)) {
          this.isSaved = true;
          this.editedCandidate.contacts.push(skypeObject);
        } else {
          this.isSaved = false;
        }
        value.object = skypeObject;
        // this.tests[] = skypeObject;
      }
    } else {
      const method = value.methodName;
      console.log(method);
      if (this.candidateWorker[method](this.editedCandidate) != null) {
        console.log(this.tests);
        if ((!this.tests[0].have || this.tests[0].control.valid) &&
          (!this.tests[1].have || this.tests[1].control.valid) &&
          (!this.tests[2].have || this.tests[2].control.valid)) {
          this.isSaved = true;
          this.editedCandidate.contacts = this.arrayWorker.removeElement(this.editedCandidate.contacts, value.object);
          this.candidateSerivce.update(this.editedCandidate).subscribe(res => {
            console.log(res);
          });
        } else {
          this.isSaved = false;
        }
      }
    }
    console.log('after', value);

  }

  changeSkype() {
    this.changeContactProperty(this.tests[1]);
  }

  changeEmail() {
    this.changeContactProperty(this.tests[0]);

  }

  changePhone() {
    this.changeContactProperty(this.tests[2]);
  }

  onFocusoutAnyInput(value: boolean = true) {
    console.log('candidate 1', this.editedCandidate);
    if (value) {
      console.log('candidate 1', this.editedCandidate);
      console.log('candidate form', this.candidateForm);
      if (this.candidateForm.valid) {
        this.isSavedCandidate = true;
        this.candidateSerivce.update(this.editedCandidate).subscribe(res => {
          this.outputEditCandidate.emit(res);
        });
      } else {
        this.isSavedCandidate = false;
      }
    }
  }

}
