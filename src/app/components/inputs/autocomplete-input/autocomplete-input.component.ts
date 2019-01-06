import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PositionModel} from '../../../classes/position-model';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {PositionsSelectComponent} from '../../selects/positions-select/positions-select.component';
import {SearchWorker} from '../../../workers/search/search.worker';

const customValueProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutocompleteInputComponent),
  multi: true
};
@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
  providers: [customValueProvider]
})
export class AutocompleteInputComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input() fullWidth: boolean;
  @Input() visibleUnderline: boolean;
  @Input() required: boolean;
  @Input() positions: PositionModel[];
  @Input() searchProperty: string;
  @Input() placeholder: string;
  @Output() blur: EventEmitter<string> = new EventEmitter<string>();
  // @Output() blur: EventEmitter<string> = new EventEmitter();
  public selectedPositions: PositionModel[];
  public value: string;
  propagateChange: any = () => {};

  constructor(private searchWorker: SearchWorker) { }

  ngOnInit() {
    this.selectedPositions = this.positions;
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
  searchPositions() {
    if (this.value) {
      this.selectedPositions = this.searchWorker.searchValueInsideProperty(this.value, this.positions, this.searchProperty);
    } else {
      this.selectedPositions = this.positions.filter((position) => {
        return position.name;
      });
    }
  }


  changeValue() {
    // console.log(this.selectedPositions);
    this.searchPositions();
    this.propagateChange(this.value);
  }
  focus() {
    this.searchPositions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('onChanges');
    // this.searchPositions();
  }
  // changePosition() {
  //   this.selectedPositions = this.searchWorker.searchObject(this.editedExperience.jobPosition, this.positions, 'name');
  // }

}
