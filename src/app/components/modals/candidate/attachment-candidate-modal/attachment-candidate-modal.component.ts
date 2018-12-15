import { Component, OnInit, Inject } from '@angular/core';
import { Candidate } from 'src/app/classes/candidate';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { NameCandidateModalComponent } from '../name-candidate-modal/name-candidate-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Attachment } from 'src/app/classes/attachment';
import { AttachmentDialogData } from 'src/app/interfaces/dialog/init/attachment-dialog-data';
import { AttachmentType } from 'src/app/enums/attachment-type.enum';
import { EnumWorker } from 'src/app/workers/enum/enum.worker';
import {BaseDialogResult} from '../../../../interfaces/dialog/result/base-dialog-result';

@Component({
  selector: 'app-attachment-candidate-modal',
  templateUrl: './attachment-candidate-modal.component.html',
  styleUrls: ['./attachment-candidate-modal.component.scss']
})
export class AttachmentCandidateModalComponent implements OnInit {

  public editedCandidate: Candidate;
  public editedAttachment: Attachment;
  public attachmentResult: BaseDialogResult<Attachment>;

  constructor(
    private candidateService: CandidateService,
    public dialogRef: MatDialogRef<NameCandidateModalComponent>,
    public enumWorker: EnumWorker,
    @Inject(MAT_DIALOG_DATA) public data: AttachmentDialogData ) {
    // console.log('candidate', this.candidate);
    this.editedCandidate = Object.assign({}, this.data.sourceCandidate);
    if (this.data.isEdit) {
      this.editedAttachment = Object.assign(new Attachment(), this.data.sourceAttachment);
    } else {
      this.editedAttachment = new Attachment();
    }
  }

  ngOnInit() {
  }

  getAttachmentsTypes() {
    const valuesOfEnum = this.enumWorker.getValuesFromEnum(AttachmentType);
    console.log(valuesOfEnum);
    return valuesOfEnum;
  }

  editCandidate() {
    if (this.editedCandidate.attachments == null) {
      this.editedCandidate.attachments = [];
    }
    this.editedCandidate.attachments.push(this.editedAttachment);
    this.candidateService.update(this.editedCandidate).subscribe(resCandidate => {
      this.attachmentResult = {
        isEdit: false,
        resObject: null,
        success: true
      };
      this.dialogRef.close(this.attachmentResult);
    });
    // this.candidateService.update(this.editedCandidate).subscribe(res => {
    //   console.log('rs', res);
    //   this.dialogRef.close(res);
    // });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
