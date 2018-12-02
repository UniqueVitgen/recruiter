import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CandidateService} from '../../../../services/candidate/candidate.service';
import {EnumWorker} from '../../../../workers/enum/enum.worker';
import {AttachmentDialogData} from '../../../../interfaces/dialog/attachment-dialog-data';
import {CandidateDialogData} from '../../../../interfaces/dialog/candidate-dialog-data';
import {Candidate} from '../../../../classes/candidate';

@Component({
  selector: 'app-candidate-modal',
  templateUrl: './candidate-modal.component.html',
  styleUrls: ['./candidate-modal.component.scss']
})
export class CandidateModalComponent implements OnInit {
  public editedCandidate: Candidate = new Candidate();

  constructor(
    public dialogRef: MatDialogRef<CandidateModalComponent>,
    private candidateService: CandidateService,
    @Inject(MAT_DIALOG_DATA) public data: CandidateDialogData) {
    if (this.data.isEdit) {
      this.editedCandidate = Object.assign({}, this.data.sourceCandidate);
    }
  }

  ngOnInit() {
  }

  editCandidate() {
    this.candidateService.update(this.editedCandidate).subscribe(res => {
      console.log('rs', res);
      this.dialogRef.close(res);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
