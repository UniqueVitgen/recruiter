import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Candidate} from 'src/app/classes/candidate';
import {MatDialog} from '@angular/material';
import {NameCandidateModalComponent} from '../../../modals/candidate/name-candidate-modal/name-candidate-modal.component';
import {StatusCandidateModalComponent} from '../../../modals/candidate/status-candidate-modal/status-candidate-modal.component';
import {CandidateWorker} from '../../../../workers/candidate/candidate.worker';
import {ContactDetails} from '../../../../classes/contact-details';
import {CandidateService} from '../../../../services/candidate/candidate.service';
import {ContactType} from '../../../../enums/contact-type.enum';
import {ArrayWorker} from '../../../../workers/array/array.worker';

@Component({
  selector: 'app-short-info-user',
  templateUrl: './short-info-user.component.html',
  styleUrls: ['./short-info-user.component.scss']
})
export class ShortInfoUserComponent implements OnInit, OnChanges {
  @Input() candidate: Candidate;
  @Input() readonly: boolean;
  @Output('editCandidate') outputEditCandidate: EventEmitter<Candidate> = new EventEmitter();
  tests = <{phone: boolean, phoneObject?: ContactDetails, skype: boolean, skypeObject?: ContactDetails, email: boolean, emailObject?: ContactDetails}>{
    phone: false,
    phoneValue: '',
    skype: false,
    skypeValue: '',
    email: false,
    emailValue: ''
  };

  constructor(public dialog: MatDialog,
              private candidateSerivce: CandidateService,
              private arrayWorker: ArrayWorker,
              public candidateWorker: CandidateWorker) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initContacts();
  }
  initContacts() {
    this.tests = {
      phone: this.candidateWorker.havePhone(this.candidate),
      skype: this.candidateWorker.haveSkype(this.candidate),
      email: this.candidateWorker.haveEmail(this.candidate)
    };
    if (this.tests.phone) { this.tests.phoneObject = this.candidateWorker.getPhoneObject(this.candidate); }
    if (this.tests.skype) { this.tests.skypeObject = this.candidateWorker.getSkypeObject(this.candidate); }
    if (this.tests.email) { this.tests.emailObject = this.candidateWorker.getEmailObject(this.candidate); }
  }

  changeSkype() {
    if (this.tests.skype) {
      if (this.candidateWorker.getSkypeObject(this.candidate) == null) {
        const skypeObject: ContactDetails = {
          contactType: ContactType.SKYPE,
          contactDetails: ''
        };
        this.candidate.contacts.push(skypeObject);
        this.tests.skypeObject = skypeObject;
      }
    } else {
      if (this.candidateWorker.getSkypeObject(this.candidate) != null) {
        this.arrayWorker.removeElement(this.candidate.contacts, this.tests.skypeObject);
      }
    }
  }

  changeEmail() {

  }

  changePhone() {

  }

  openStatusDialog(): void {
    const dialogRef = this.dialog.open(StatusCandidateModalComponent, {
      data: this.candidate
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  openNameDialog(): void {
    const dialogRef = this.dialog.open(NameCandidateModalComponent, {
      data: this.candidate
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  onFocusoutAnyInput() {
    console.log('candidate', this.candidate);
    this.candidateSerivce.update(this.candidate).subscribe(res => {
      this.outputEditCandidate.emit(res);
    });
  }

}
