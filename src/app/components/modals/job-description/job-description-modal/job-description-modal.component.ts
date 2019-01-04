import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {JobDescriptionDialogData} from '../../../../interfaces/dialog/init/job-description-dialog-data';
import {Vacancy, VacancyForm} from '../../../../classes/vacancy';
import {FormControl, FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {SearchWorker} from '../../../../workers/search/search.worker';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ArrayWorker} from '../../../../workers/array/array.worker';
import {VacancyService} from '../../../../services/vacancy/vacancy.service';
import {CandidateDialogResult} from '../../../../interfaces/dialog/result/candidate-dialog-result';
import {BaseDialogResult} from '../../../../interfaces/dialog/result/base-dialog-result';
import {RegexpConst} from '../../../../const/regexp.const';
import {VacancyState} from '../../../../enums/vacancy-state.enum';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-job-description-modal',
  templateUrl: './job-description-modal.component.html',
  styleUrls: ['./job-description-modal.component.scss']
})
export class JobDescriptionModalComponent implements OnInit {
  private dialogResult: BaseDialogResult<Vacancy>;
  editedVacancy: VacancyForm;
  statuses = [VacancyState.OPEN, VacancyState.CLOSE];

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<JobDescriptionModalComponent>,
              public searchWorker: SearchWorker,
              private vacancyService: VacancyService,
              private arrayWorker: ArrayWorker,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: JobDescriptionDialogData) {
  }

  vacancyForm: FormGroup = this.fb.group({
    requirementsGroup: '',
  });

  stateGroups: StateGroup[] = [{
    letter: 'Prog Lang',
    names: ['Java', 'TS', 'JS', 'Python']
  }, {
    letter: 'Speak Lang',
    names: ['English', 'Spanish', 'Russian']
  }, {
    letter: 'Sex',
    names: ['Male', 'Female']
  }, {
    letter: 'Age',
    names: ['18+', '20+', '25+', '30+']
  }, {
    letter: 'Belbin',
    names: ['Plant', 'Resource Investigator', 'Co-ordinator', 'Shaper', 'Monitor Evaluator', 'Teamworker',
      'Implementer', 'Completer Finisher', 'Specialist']
  }];



  ngOnInit() {
    if (this.data.isEdit) {
      this.editedVacancy = <any>Object.assign({}, this.data.sourceJobDescription);
    } else {
      this.editedVacancy = new VacancyForm();
      this.editedVacancy.requirements = [];
    }
  }

  public filterGroup(value: string): StateGroup[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.stateGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(req => req.names.filter( name => {
          return name.toLowerCase().indexOf(filterValue) > -1; }).length > 0);
    }

    return this.stateGroups;
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
    this.editedVacancy.requirements.push(<any>{
      name: '',
      public: false,
      required: false,
      options: this.stateGroups
    });
  }

  changeRequirments(name: string, index: number) {
    this.editedVacancy.requirements[index].options = this.filterGroup(name);
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
