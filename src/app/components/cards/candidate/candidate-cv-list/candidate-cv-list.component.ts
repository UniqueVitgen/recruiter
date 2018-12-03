import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from 'src/app/classes/candidate';
import { Attachment } from 'src/app/classes/attachment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { ArrayWorker } from 'src/app/workers/array/array.worker';
import { AttachmentCandidateModalComponent } from '../../../modals/candidate/attachment-candidate-modal/attachment-candidate-modal.component';
import { AttachmentDialogData } from 'src/app/interfaces/dialog/init/attachment-dialog-data';

@Component({
  selector: 'app-candidate-cv-list',
  templateUrl: './candidate-cv-list.component.html',
  styleUrls: ['./candidate-cv-list.component.scss']
})
export class CandidateCvListComponent implements OnInit {
  @Input() candidate: Candidate;
  constructor(
    private candidateService: CandidateService, 
    private arrayWorker: ArrayWorker,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
  }

  onDeleteAttachment(attachment: Attachment, index: number) {
    this.candidate.attachments = this.arrayWorker.removeElement(this.candidate.attachments, attachment);
    console.log(this.candidate);
  }

  openAttachmentDialog(): void {
    const dialogConfig :MatDialogConfig<AttachmentDialogData> = {
      data: {
        sourceCandidate: this.candidate,
        isEdit: false
      }
    };
    const dialogRef = this.dialog.open(AttachmentCandidateModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
