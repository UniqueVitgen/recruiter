import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {JobDescriptionDialogData} from '../../../../interfaces/dialog/init/job-description-dialog-data';
import {Vacancy} from '../../../../classes/vacancy';
import {FormControl, FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {SearchWorker} from '../../../../workers/search/search.worker';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ArrayWorker} from '../../../../workers/array/array.worker';
import { VacancyService } from '../../../../services/vacancy/vacancy.service';
import { CandidateDialogResult } from '../../../../interfaces/dialog/result/candidate-dialog-result';
import { BaseDialogResult } from '../../../../interfaces/dialog/result/base-dialog-result';
import { RegexpConst } from '../../../../const/regexp.const';

@Component({
  selector: 'app-job-description-modal',
  templateUrl: './job-description-modal.component.html',
  styleUrls: ['./job-description-modal.component.scss']
})
export class JobDescriptionModalComponent implements OnInit {
  private dialogResult: BaseDialogResult<Vacancy>;
  editedVacancy: Vacancy;
  testRequirements = [
    'Communicable',
    'TeamLeader',
    'Responsible'
  ];

  constructor(
    public dialogRef: MatDialogRef<JobDescriptionModalComponent>,
    public searchWorker: SearchWorker,
    private vacancyService: VacancyService,
    private arrayWorker: ArrayWorker,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: JobDescriptionDialogData) {
  }

  ngOnInit() {
    if (this.data.isEdit) {
      this.editedVacancy = Object.assign({}, this.data.sourceJobDescription);
    } else {
      this.editedVacancy = new Vacancy();
      this.editedVacancy.requirements = [];
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  removeElement(element: any) {
    this.editedVacancy.requirements = this.arrayWorker.removeElement(this.editedVacancy.requirements, element);
  }

  addRequirement() {
    if (this.editedVacancy.requirements == null) {
      this.editedVacancy.requirements = [];
    }
    this.editedVacancy.requirements.push({
      name: '',
      public: false,
      required: false
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.editedVacancy.requirements, event.previousIndex, event.currentIndex);
  }

  save() {
    if (this.data.isEdit) {
      this.vacancyService.update(this.editedVacancy).subscribe(resVacancy => {
        this.dialogResult = {
          isEdit: this.data.isEdit,
          resObject: resVacancy,
          success: true
        };
        this.dialogRef.close(this.dialogResult);
      });
    } else {
      this.vacancyService.add(this.editedVacancy).subscribe(resVacancy => {
        console.log('resVacancy', resVacancy);
        this.dialogResult = {
          isEdit: this.data.isEdit,
          resObject: resVacancy,
          success: true
        };
        this.dialogRef.close(this.dialogResult);
      });
    }
  }

}
