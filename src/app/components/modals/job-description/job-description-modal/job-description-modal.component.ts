import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {JobDescriptionDialogData} from '../../../../interfaces/dialog/job-description-dialog-data';
import {Vacancy} from '../../../../classes/vacancy';
import {FormControl} from '@angular/forms';
import {SearchWorker} from '../../../../workers/search/search.worker';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-job-description-modal',
  templateUrl: './job-description-modal.component.html',
  styleUrls: ['./job-description-modal.component.scss']
})
export class JobDescriptionModalComponent implements OnInit {
  editedVacancy: Vacancy;
  testRequirements = [
    'Communicable',
    'TeamLeader',
    'Responsible'
  ];

  constructor(
    public dialogRef: MatDialogRef<JobDescriptionModalComponent>,
    public searchWorker: SearchWorker,
    @Inject(MAT_DIALOG_DATA) public data: JobDescriptionDialogData) {
    this.editedVacancy = Object.assign({}, this.data.sourceJobDescription);
  }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  addRequirement() {
    this.editedVacancy.requirements.push({
      name: ''
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.editedVacancy.requirements, event.previousIndex, event.currentIndex);
  }

}
