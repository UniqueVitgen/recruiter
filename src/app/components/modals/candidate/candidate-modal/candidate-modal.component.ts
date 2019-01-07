import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CandidateService} from '../../../../services/candidate/candidate.service';
import {CandidateDialogData} from '../../../../interfaces/dialog/init/candidate-dialog-data';
import {Candidate} from '../../../../classes/candidate';
import {CandidateDialogResult} from '../../../../interfaces/dialog/result/candidate-dialog-result';
import {ContactType} from '../../../../enums/contact-type.enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegexpConst} from '../../../../const/regexp.const';
import {CandidateState} from '../../../../enums/candidate-state.enum';
import {ArrayWorker} from '../../../../workers/array/array.worker';
import {EnumWorker} from '../../../../workers/enum/enum.worker';
import {UserWorker} from '../../../../workers/user/user.worker';

@Component({
  selector: 'app-candidate-modal',
  templateUrl: './candidate-modal.component.html',
  styleUrls: ['./candidate-modal.component.scss']
})
export class CandidateModalComponent implements OnInit {
  public editedCandidate: Candidate = new Candidate();
  private dialogResult: CandidateDialogResult;
  public candidateForm: FormGroup;
  public mask = ['+', '3', '7', '5', ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  setStates: string[];
  public minBirthdayDate: Date;
  public maxBirthdayDate: Date;

  constructor(
    public dialogRef: MatDialogRef<CandidateModalComponent>,
    private candidateService: CandidateService,
    private formBuilder: FormBuilder,
    public  enumWorker: EnumWorker,
    private userWorker: UserWorker,
    @Inject(MAT_DIALOG_DATA) public data: CandidateDialogData) {
  }

  ngOnInit() {
    this.minBirthdayDate = this.userWorker.generateRequiredStartDate();
    this.maxBirthdayDate = this.userWorker.generateRequiredEndDate();
    if (this.data.isEdit) {
      this.editedCandidate = Object.assign({}, this.data.sourceCandidate);
    } else {
      this.editedCandidate = {
        name: '',
        surname: '',
        candidateState: {
          name: 'New'
        },
        contacts: [
          {
            contactType: ContactType.SKYPE,
            contactDetails: ''
          },
          {
            contactType: ContactType.PHONE,
            contactDetails: ''
          },
          {
            contactType: ContactType.EMAIL,
            contactDetails: ''
          }
        ]
        ,
        position: {
          name: ''
        }
      };
      this.candidateForm = this.formBuilder.group({
        name: ['', Validators.compose([Validators.required, Validators.pattern(RegexpConst.LATIN_OR_CYRILIC_NAME)])],
        surname: ['', Validators.compose([Validators.required, Validators.pattern(RegexpConst.LATIN_OR_CYRILIC_NAME)])],
        state: [''],
        position: [''],
        salaryInDollars: [''],
        birthday: [''],
        status: ['New', Validators.compose([Validators.required])],
        skype: [''],
        phone: ['', Validators.compose([Validators.pattern(RegexpConst.BELLARUSSIAN_PHONE)])],
        email: ['', Validators.compose([Validators.pattern(RegexpConst.EMAIL)])]
      });
      console.log(this.editedCandidate);
    }
    this.setStates = this.enumWorker.getValuesFromEnum(CandidateState);
  }
  checkForm() {
    console.log(this.candidateForm.controls);
  }

  changePhone() {
  }

  editCandidate() {
    console.log(this.editedCandidate);
    if (this.data.isEdit) {
      this.candidateService.update(this.editedCandidate).subscribe(res => {
        this.dialogResult = {
          isEdit: this.data.isEdit,
          resCandidate: res,
          success: true
        };
        console.log('rs', res);
        this.dialogRef.close(res);
      });
    } else {
      this.editedCandidate.contacts =  this.editedCandidate.contacts.filter(contact => contact.contactDetails !== '' );

      this.candidateService.add(this.editedCandidate).subscribe(res => {
        console.log('rs', res);
        this.dialogResult = {
          isEdit: this.data.isEdit,
          resCandidate: res,
          success: true
        };
        this.dialogRef.close( this.dialogResult);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
