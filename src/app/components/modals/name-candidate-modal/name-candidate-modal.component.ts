import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Candidate } from 'src/app/classes/candidate';

@Component({
  selector: 'app-name-candidate-modal',
  templateUrl: './name-candidate-modal.component.html',
  styleUrls: ['./name-candidate-modal.component.scss']
})
export class NameCandidateModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public candidate: Candidate) { 
      console.log('candidate', this.candidate);
    }

  ngOnInit() {
  }

}
