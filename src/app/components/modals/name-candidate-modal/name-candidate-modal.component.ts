import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Candidate } from 'src/app/classes/candidate';
import { CandidateService } from 'src/app/services/candidate/candidate.service';

@Component({
  selector: 'app-name-candidate-modal',
  templateUrl: './name-candidate-modal.component.html',
  styleUrls: ['./name-candidate-modal.component.scss']
})
export class NameCandidateModalComponent implements OnInit {

  private editedCandidate: Candidate;

  constructor(
    private candidateService: CandidateService,
    public dialogRef: MatDialogRef<NameCandidateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public candidate: Candidate) {
      console.log('candidate', this.candidate);
      this.editedCandidate = Object.assign({}, this.candidate);
    }

  ngOnInit() {
  }

  editCandidate() {
    this.candidateService.update(this.editedCandidate).subscribe(res => {
      console.log('rs', res);
      this.dialogRef.close();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
