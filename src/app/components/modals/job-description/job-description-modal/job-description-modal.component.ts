import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {JobDescriptionDialogData} from '../../../../interfaces/dialog/init/job-description-dialog-data';
import {Vacancy, VacancyForm} from '../../../../classes/vacancy';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {SearchWorker} from '../../../../workers/search/search.worker';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ArrayWorker} from '../../../../workers/array/array.worker';
import {VacancyService} from '../../../../services/vacancy/vacancy.service';
import {BaseDialogResult} from '../../../../interfaces/dialog/result/base-dialog-result';
import {VacancyState} from '../../../../enums/vacancy-state.enum';
import {PositionModel} from '../../../../classes/position-model';
import {PositionService} from '../../../../services/position/position.service';
import {TypeCheckingWorker} from '../../../../workers/type-checking/type-checking.worker';
import {TranslateWorker} from '../../../../workers/translate/translate.worker';
import {NumberWorker} from '../../../../workers/number/number.worker';

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
  positions: PositionModel[];
  selectedPositions: PositionModel[];

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<JobDescriptionModalComponent>,
              public searchWorker: SearchWorker,
              public numberWorker: NumberWorker,
              private typeCheckingWorker: TypeCheckingWorker,
              private vacancyService: VacancyService,
              private arrayWorker: ArrayWorker,
              private formBuilder: FormBuilder,
              private positionService: PositionService,
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
      this.editedVacancy = this.typeCheckingWorker.parseObject(this.data.sourceJobDescription);
    } else {
      this.editedVacancy = new VacancyForm();
      this.editedVacancy.vacancyState = VacancyState.OPEN;
      this.editedVacancy.requirements = [];
    }
    console.log('editedVacancy', this.editedVacancy);
    this.getPositions();
  }
  changePosition() {
    this.selectedPositions = this.searchWorker.searchObject(this.editedVacancy.position, this.positions, 'name');
  }
  getPositions() {
    this.positionService.getAll().subscribe((resPositions: PositionModel[]) => {
      this.positions = resPositions;
      this.selectedPositions = this.positions.filter((position) => {
        return position.name.trim();
      });
    });
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

  updateValidation(form: NgForm) {
    // form.v
    setTimeout(() => {
      form.control.updateValueAndValidity();
      form.controls.salaryInDollarsFrom.updateValueAndValidity();
      form.controls.salaryInDollarsTo.updateValueAndValidity();
    }, 200);
  }

  save() {
    if (this.data.isEdit) {
      if (!this.numberWorker.isValidNumber(this.editedVacancy.salaryInDollarsTo)) {
        this.editedVacancy.salaryInDollarsTo = null;
      }
      if (!this.numberWorker.isValidNumber(this.editedVacancy.salaryInDollarsFrom)) {
        this.editedVacancy.salaryInDollarsFrom = null;
      }
      if (!this.numberWorker.isValidNumber(this.editedVacancy.experienceYearsRequire)) {
        this.editedVacancy.experienceYearsRequire = null;
      }
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
