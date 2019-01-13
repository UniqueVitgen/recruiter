import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TypeCheckingWorker} from '../../../workers/type-checking/type-checking.worker';
import {Options, LabelType} from 'ng5-slider';
import {TranslateWorker} from '../../../workers/translate/translate.worker';
import {NumberWorker} from '../../../workers/number/number.worker';

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
  private _validSalaryFilter: boolean;
  get validSalaryFilter(): boolean {
    return this._validSalaryFilter;
  }
  set validSalaryFilter(value: boolean) {
    this._validSalaryFilter = value;
    this.validSalaryFilterChange.emit(value);
  }
  @Output() validSalaryFilterChange: EventEmitter<boolean> = new EventEmitter();
  private _validYearsRequiredFilter: boolean;
  get validYearsRequiredFilter(): boolean {
    return this._validYearsRequiredFilter;
  }
  set validYearsRequiredFilter(value: boolean) {
    this._validYearsRequiredFilter = value;
    this.validYearsRequiredFilterChange.emit(value);
  }
  @Output() validYearsRequiredFilterChange: EventEmitter<boolean> = new EventEmitter();
  constructor(private typeCheckingWorker: TypeCheckingWorker,
              private translateWorker: TranslateWorker,
              private numberWorker: NumberWorker) { }

  ngOnInit() {
    this.translateWorker.changeValue.subscribe(resLang => {
      this.ngOnChanges(null);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initSalary();
    this.initYearsRequired();
  }
  initSalary() {
    if (isFinite(this.salaryLow) && isFinite(this.salaryTop)) {
      if (!isFinite(this.minSalary)) {
        this.minSalary = this.salaryLow;
      }
      if (!isFinite(this.maxSalary)) {
        this.maxSalary = this.salaryTop;
      }
      this.validSalaryFilter = this.salaryTop !== this.salaryLow;
      this.salaryOptions = this.generateSalaryOptions();
    } else {
      this.validSalaryFilter = false;
    }
  }
  initYearsRequired() {
    console.log('this.yearsRequiredLow', this.yearsRequiredLow);
    if (isFinite(this.yearsRequiredLow) && isFinite(this.yearsRequiredTop)) {
      if (!isFinite(this.minYearsRequired)) {
        this.minYearsRequired = this.yearsRequiredLow;
      }
      if (!isFinite(this.maxYearsRequired)) {
        this.maxYearsRequired = this.yearsRequiredTop;
      }
      this.validYearsRequiredFilter = this.yearsRequiredTop !== this.yearsRequiredLow;
      this.yearsRequiredOptions = this.generateYearsRequiredOptions();
    } else {
      this.validYearsRequiredFilter = false;
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
            return '<b>' + this.translateWorker.translateWord('Min experience year')
              + ': </b>' + this.numberWorker.formatYears(value);
          case LabelType.High:
            return '<b>' + this.translateWorker.translateWord('Max experience year')
              + ':</b>' + this.numberWorker.formatYears(value);
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

}
