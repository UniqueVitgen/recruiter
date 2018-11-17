import { Component, OnInit, Inject } from '@angular/core';
import { Candidate } from 'src/app/classes/candidate';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NameCandidateModalComponent } from '../name-candidate-modal/name-candidate-modal.component';

@Component({
  selector: 'app-status-candidate-modal',
  templateUrl: './status-candidate-modal.component.html',
  styleUrls: ['./status-candidate-modal.component.scss']
})
export class StatusCandidateModalComponent implements OnInit {


  private editedCandidate: Candidate;

  constructor(
    private candidateService: CandidateService,
    public dialogRef: MatDialogRef<StatusCandidateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public candidate: Candidate) { 
      console.log('candidate', this.candidate);
      this.editedCandidate = Object.assign({}, this.candidate);
      this.editedCandidate.candidateState = Object.assign({}, this.editedCandidate.candidateState);
    }
  ngOnInit() {
  }

  editCandidate() {
    this.candidateService.update(this.editedCandidate).subscribe(res => {
      console.log('rs',res);
      this.dialogRef.close();
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
