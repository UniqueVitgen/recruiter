import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {LabelType, Options} from 'ng5-slider';
import {TranslateWorker} from '../../../workers/translate/translate.worker';
import {NumberWorker} from '../../../workers/number/number.worker';

@Component({
  selector: 'app-candidate-filter-toolbar',
  templateUrl: './candidate-filter-toolbar.component.html',
  styleUrls: ['./candidate-filter-toolbar.component.scss']
})
export class CandidateFilterToolbarComponent implements OnInit, OnChanges {
  @Input() statusesList: string[];
  @Input() salaryLow: number;
  @Input() salaryTop: number;
  @Input() yearsRequiredLow: number;
  @Input() yearsRequiredTop: number;
  @Input()
  selectedStatuses: string[];
  @Output()
  selectedStatusesChange = new EventEmitter();
  @Input()
  minSalary: number;
  @Output()
  minSalaryChange: EventEmitter<number> = new EventEmitter();
  @Input()
  maxSalary: number;
  @Output()
  maxSalaryChange: EventEmitter<number> = new EventEmitter();
  @Input()
  minYearsRequired: number;
  @Output()
  minYearsRequiredChange: EventEmitter<number> = new EventEmitter();
  @Input()
  maxYearsRequired: number;
  @Output()
  maxYearsRequiredChange: EventEmitter<number> = new  EventEmitter();
  @Input() includeUndefinedBirthday: boolean;
  @Output() includeUndefinedBirthdayChange: EventEmitter<boolean> = new EventEmitter();
  salaryOptions: Options;
  yearsRequiredOptions: Options;

  constructor(private translateWorker: TranslateWorker, private numberWorker: NumberWorker) { }

  ngOnInit() {
    this.translateWorker.changeValue.subscribe(resLanguage => {
      this.ngOnChanges(null);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.salaryLow != null && this.salaryTop != null) {
      if (isNaN(this.minSalary) || !this.minSalary == null) {
        console.log('low 2', this.salaryLow);
        this.minSalary = this.salaryLow;
      }
      if (isNaN(this.maxSalary) || !this.maxSalary) {
        this.maxSalary = this.salaryTop;
      }
      this.salaryOptions = this.generateSalaryOptions();
    }
    if (this.yearsRequiredLow != null && this.yearsRequiredTop != null) {
      if (isNaN(this.minYearsRequired) || !this.minYearsRequired == null) {
        this.minYearsRequired = this.yearsRequiredLow;
      }
      if (isNaN(this.maxYearsRequired) || !this.maxYearsRequired) {
        this.maxYearsRequired = this.yearsRequiredTop;
      }
      this.yearsRequiredOptions = this.generateYearsRequiredOptions();
    }
  }
  generateSalaryOptions(): Options {
    return {
      floor: this.salaryLow,
      ceil: this.salaryTop,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return '<b>' + this.translateWorker.translateWord('Min salary') + ': </b> $' + value;
          case LabelType.High:
            return '<b>' + this.translateWorker.translateWord('Max salary') + ':</b> $' + value;
          default:
            return '$' + value;
        }
      }
    };
  }
  generateYearsRequiredOptions(): Options {
    return {
      floor: this.yearsRequiredLow,
      ceil: this.yearsRequiredTop,
      translate: (value:  number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return '<b>' + this.translateWorker.translateWord('Min year') + ': </b>' + this.numberWorker.formatYears(value);
          case LabelType.High:
            return '<b>' + this.translateWorker.translateWord('Max year') + ':</b>' + this.numberWorker.formatYears(value);
          default:
            return  this.numberWorker.formatYears(value);
        }
      }
    };
  }
  changeStatuses() {
    this.selectedStatusesChange.emit(this.selectedStatuses);
  }
  changeMinSalary() {
    this.minSalaryChange.emit(this.minSalary);
  }
  changeMaxSalary() {
    this.maxSalaryChange.emit(this.maxSalary);
  }
  changeMinYearsRequired() {
    this.minYearsRequiredChange.emit(this.minYearsRequired);
  }
  changeMaxYearsRequired() {
    this.maxYearsRequiredChange.emit(this.maxYearsRequired);
  }
  changeIncludeUndefinedBirthday() {
    this.includeUndefinedBirthdayChange.emit(this.includeUndefinedBirthday);
  }

}
