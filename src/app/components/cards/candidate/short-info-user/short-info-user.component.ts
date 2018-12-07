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
import {StringWorker} from '../../../../workers/string/string.worker';
import {CandidateContactInput} from '../../../../classes/html/candidate-contact-input';
import {FormControl, Validators} from '@angular/forms';
import {RegexpConst} from '../../../../const/regexp.const';
import {MaskConst} from '../../../../const/mask.const';

@Component({
  selector: 'app-short-info-user',
  templateUrl: './short-info-user.component.html',
  styleUrls: ['./short-info-user.component.scss']
})
export class ShortInfoUserComponent implements OnInit, OnChanges {
  @Input() candidate: Candidate;
  @Input() readonly: boolean;
  @Output('editCandidate') outputEditCandidate: EventEmitter<Candidate> = new EventEmitter();
  tests: CandidateContactInput[] ;
  MaskConst = MaskConst;

  constructor(public dialog: MatDialog,
              private candidateSerivce: CandidateService,
              private stringWorker: StringWorker,
              private arrayWorker: ArrayWorker,
              public candidateWorker: CandidateWorker) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initContacts();
  }
  initContacts() {
    // this.tests = [
    //   phone: this.candidateWorker.havePhone(this.candidate),
    //   skype: this.candidateWorker.haveSkype(this.candidate),
    //   email: this.candidateWorker.haveEmail(this.candidate)
    // ];
    this.tests = [
      {have: this.candidateWorker.haveEmail(this.candidate),
        value: ContactType.EMAIL,
        methodName: 'getEmailObject',
        control: new FormControl('', Validators.compose([Validators.pattern(RegexpConst.EMAIL)]))
      },
      {have: this.candidateWorker.haveSkype(this.candidate),
        value: ContactType.SKYPE, methodName: 'getSkypeObject',
        control: new FormControl('', Validators.compose([]))},
      {have: this.candidateWorker.havePhone(this.candidate),
        value: ContactType.PHONE,
        methodName: 'getPhoneObject',
        control: new FormControl('', Validators.compose([Validators.pattern(RegexpConst.BELLARUSSIAN_PHONE)]))
      }
    ];
    console.log(this.tests);
    if (this.tests[0].have) { this.tests[2].object = this.candidateWorker.getEmailObject(this.candidate); }
    if (this.tests[1].have) { this.tests[1].object = this.candidateWorker.getSkypeObject(this.candidate); }
    if (this.tests[2].have) { this.tests[0].object = this.candidateWorker.getPhoneObject(this.candidate); }
  }
  changeContactProperty(value: CandidateContactInput) {
    console.log(value);
    if (value.have) {
      if (this.candidateWorker[value.methodName](this.candidate) == null) {
        let skypeObject: ContactDetails;
        if (value.object) {
          skypeObject = value.object;
        } else {
          skypeObject = {
            contactType:  value.value,
            contactDetails: ''
          };
        }
        this.candidate.contacts.push(skypeObject);
        value.object = skypeObject;
        // this.tests[] = skypeObject;
      }
    } else {
      const method = value.methodName;
      console.log(method);
      if (this.candidateWorker[method](this.candidate) != null) {
        this.candidate.contacts = this.arrayWorker.removeElement(this.candidate.contacts, value.object);
        this.candidateSerivce.update(this.candidate).subscribe(res => {
          console.log(res);
        });
      }
    }
    console.log('after', value);

  }

  changeSkype() {
    this.changeContactProperty(this.tests[1]);
  }

  changeEmail() {
    this.changeContactProperty(this.tests[2]);
    // if (this.tests.email) {
    //   if (this.candidateWorker.getEmailObject(this.candidate) == null) {
    //     const emailObject: ContactDetails = {
    //       contactType: ContactType.EMAIL,
    //       contactDetails: ''
    //     };
    //     this.candidate.contacts.push(emailObject);
    //     this.tests.emailObject = emailObject;
    //   }
    // } else {
    //   if (this.candidateWorker.getEmailObject(this.candidate) != null) {
    //     this.candidate.contacts = this.arrayWorker.removeElement(this.candidate.contacts, this.tests.emailObject);
    //     this.candidateSerivce.update(this.candidate).subscribe(res => {
    //       console.log(res);
    //     });
    //   }
    // }

  }

  changePhone() {
    this.changeContactProperty(this.tests[0]);
    // if (this.tests.phone) {
    //   if (this.candidateWorker.getPhoneObject(this.candidate) == null) {
    //     const phoneObject: ContactDetails = {
    //       contactType: ContactType.PHONE,
    //       contactDetails: ''
    //     };
    //     this.candidate.contacts.push(phoneObject);
    //     this.tests.phoneObject = phoneObject;
    //   }
    // } else {
    //   if (this.candidateWorker.getPhoneObject(this.candidate) != null) {
    //     this.candidate.contacts = this.arrayWorker.removeElement(this.candidate.contacts, this.tests.phoneObject);
    //     this.candidateSerivce.update(this.candidate).subscribe(res => {
    //       console.log(res);
    //     });
    //   }
    // }
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

  onFocusoutAnyInput(value: boolean = true) {
    if (value) {
      console.log('candidate', this.candidate);
      this.candidateSerivce.update(this.candidate).subscribe(res => {
        this.outputEditCandidate.emit(res);
      });
    }
  }

}
