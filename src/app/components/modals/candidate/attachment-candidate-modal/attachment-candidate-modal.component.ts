import { Component, OnInit, Inject } from '@angular/core';
import { Candidate } from 'src/app/classes/candidate';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { NameCandidateModalComponent } from '../name-candidate-modal/name-candidate-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Attachment } from 'src/app/classes/attachment';
import { AttachmentDialogData } from 'src/app/interfaces/dialog/attachment-dialog-data';
import { AttachmentType } from 'src/app/enums/attachment-type.enum';
import { EnumWorker } from 'src/app/workers/enum/enum.worker';

@Component({
  selector: 'app-attachment-candidate-modal',
  templateUrl: './attachment-candidate-modal.component.html',
  styleUrls: ['./attachment-candidate-modal.component.scss']
})
export class AttachmentCandidateModalComponent implements OnInit {

  private editedCandidate: Candidate;
  private editedAttachment: Attachment;

  constructor(
    private candidateService: CandidateService,
    public dialogRef: MatDialogRef<NameCandidateModalComponent>,
    private EnumWorker: EnumWorker,
    @Inject(MAT_DIALOG_DATA) public data: AttachmentDialogData) {
    // console.log('candidate', this.candidate);
    this.editedCandidate = Object.assign({}, this.data.sourceCandidate);
    if(this.data.isEdit) {
      this.editedAttachment = Object.assign(new Attachment(), this.data.sourceAttachment);
    }
    else {
      this.editedAttachment = new Attachment();
    }
  }

  ngOnInit() {
  }

  getAttachmentsTypes() {
    const valuesOfEnum = this.EnumWorker.getValuesFromEnum(AttachmentType);
    console.log(valuesOfEnum);
    return valuesOfEnum;
  }

  editCandidate() {
    this.candidateService.update(this.editedCandidate).subscribe(res => {
      console.log('rs', res);
      this.dialogRef.close(res);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
