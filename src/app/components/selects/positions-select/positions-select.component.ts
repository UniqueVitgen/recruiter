import {AfterViewInit, Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {Vacancy} from '../../../classes/vacancy';
import {MatSelect} from '@angular/material';
import {take, takeUntil} from 'rxjs/operators';

const customValueProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PositionsSelectComponent),
  multi: true
};

@Component({
  selector: 'app-positions-select',
  templateUrl: './positions-select.component.html',
  styleUrls: ['./positions-select.component.scss'],
  providers: [customValueProvider]
})
export class PositionsSelectComponent implements OnDestroy, AfterViewInit, OnChanges, ControlValueAccessor {
  @Input() vacancies: Vacancy[];
  @Input() visibleUnderline: boolean;
  public vacancyCtrl: FormControl = new FormControl();
  public vacancyFilterCtrl: FormControl = new FormControl();
  public value: string;
  public filteredVacancies: ReplaySubject<Vacancy[]> = new ReplaySubject<Vacancy[]>(1);
  @ViewChild('singleSelect') singleSelect: MatSelect;
  private _onDestroy = new Subject<void>();
  propagateChange: any = () => {};

  constructor() { }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  private setInitialValue() {
    this.filteredVacancies
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: string, b: string) => a === b;
      });
  }
  private filterVacancies() {
    if (!this.vacancies) {
      return;
    }
    // get the search keyword
    let search = this.vacancyFilterCtrl.value;
    if (!search) {
      this.filteredVacancies.next(this.vacancies.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks0
    this.filteredVacancies.next(
      this.vacancies.filter(vacancy => vacancy.position.toLowerCase().indexOf(search) > -1)
    );
  }
  ngOnChanges() {
    if (this.vacancies) {
      //
      this.filteredVacancies.next(this.vacancies.slice());
    }
    this.vacancyFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterVacancies();
      });
  }

  writeValue(obj: string): void {
    if (obj) {
      this.value = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  changeValue() {
    this.propagateChange(this.value);
  }


}
