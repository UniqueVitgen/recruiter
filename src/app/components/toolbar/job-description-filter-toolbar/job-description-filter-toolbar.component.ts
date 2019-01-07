import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TypeCheckingWorker} from '../../../workers/type-checking/type-checking.worker';
import {Options, LabelType} from 'ng5-slider';
import {TranslateWorker} from '../../../workers/translate/translate.worker';

@Component({
  selector: 'app-job-description-filter-toolbar',
  templateUrl: './job-description-filter-toolbar.component.html',
  styleUrls: ['./job-description-filter-toolbar.component.scss']
})
export class JobDescriptionFilterToolbarComponent implements OnInit, OnChanges {
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
  salaryOptions: Options;
  yearsRequiredOptions: Options;
  constructor(private typeCheckingWorker: TypeCheckingWorker,
              private translateWorker: TranslateWorker) { }

  ngOnInit() {
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
            return '<b>' + this.translateWorker.translateWord('Min year required') + ': </b>' + value + ' '
            + this.translateWorker.translateWord('years');
          case LabelType.High:
            return '<b>' + this.translateWorker.translateWord('Max year required') + ':</b>' + value + ' '
              + this.translateWorker.translateWord('years');
          default:
            return  value + ' '
              + this.translateWorker.translateWord('years');
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

}
