import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ContactsDialogData} from '../../../../interfaces/dialog/init/contacts-dialog-data';
import {Candidate} from '../../../../classes/candidate';
import {TypeCheckingWorker} from '../../../../workers/type-checking/type-checking.worker';
import {ContactType} from '../../../../enums/contact-type.enum';
import {EnumWorker} from '../../../../workers/enum/enum.worker';
import {ContactDetails} from '../../../../classes/contact-details';
import {RegexpConst} from '../../../../const/regexp.const';
import {ArrayWorker} from '../../../../workers/array/array.worker';

@Component({
  selector: 'app-contacts-candidate-modal',
  templateUrl: './contacts-candidate-modal.component.html',
  styleUrls: ['./contacts-candidate-modal.component.scss']
})
export class ContactsCandidateModalComponent implements OnInit {
  public editedCandidate: Candidate;
  public contactTypes: ContactType[];
  @Output() outputClickSave: EventEmitter<Candidate> = new EventEmitter();

  constructor(
    private dialogRef: MatDialogRef<ContactsCandidateModalComponent>,
    public typeCheckingWorker: TypeCheckingWorker,
    private arrayWorker: ArrayWorker,
    private enumWorker: EnumWorker,
    @Inject(MAT_DIALOG_DATA) public data: ContactsDialogData) { }

  ngOnInit() {
    console.log('data', this.data);
    this.contactTypes = this.enumWorker.getValuesFromEnum(ContactType);
    if (this.data.isEdit) {
      this.editedCandidate = this.typeCheckingWorker.parseObject(this.data.sourceCandidate);
    }
  }

  addContact() {
    if (this.editedCandidate.contacts == null) {
      this.editedCandidate.contacts = [];
    }
    this.editedCandidate.contacts.push({
      contactType: '',
      contactDetails: ''
    });
  }
  deleteContact(index: number): void {
    this.editedCandidate.contacts = this.arrayWorker.removeElementByIndex(this.editedCandidate.contacts, index);
  }

  save() {
    this.outputClickSave.emit(this.editedCandidate);
  }
  getPattern(contactDetails: ContactDetails) {
    if (contactDetails.contactType === ContactType.EMAIL) {
      return RegexpConst.EMAIL;
    } else if (contactDetails.contactType === ContactType.PHONE) {
      return RegexpConst.BELLARUSSIAN_PHONE;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
