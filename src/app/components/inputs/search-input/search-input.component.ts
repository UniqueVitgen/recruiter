import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import set = Reflect.set;

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit, OnChanges {
  @Input() isAdvancedSearch: boolean;
  @Input() autocompleteList: string[];
  @Output('onSearch') outputOnSearch: EventEmitter<string> = new EventEmitter();
  @Output('clickAdvancedSearch') outputClickAdvancedSearch: EventEmitter<boolean> = new EventEmitter();
  value: string;
  isFocus: boolean;
  limitTo: number = 5;
  public filteredAutocompleteList: string[];
  public isTurnOnAdvancedSearch: boolean;

  constructor() { }

  ngOnInit() {
  }
  search(value: string) {
    console.log(value);
    // this.value = value;
    const searchValue = value.toLowerCase();
    if (this.autocompleteList) {
      this.filteredAutocompleteList = this.autocompleteList.filter((item) => {
        console.log(item);
        const itemSearch = item.toLowerCase();
        return itemSearch.indexOf(searchValue) > -1 && itemSearch !== '';
      });
    }
    this.outputOnSearch.emit(value);
  }
  clickAdvancedSearch() {
    this.isTurnOnAdvancedSearch = !this.isTurnOnAdvancedSearch;
    this.outputClickAdvancedSearch.emit(this.isTurnOnAdvancedSearch);
  }
  focus() {
    // setTimeout(() => {
      this.isFocus = true;
    // }, 2000);
  }
  blur() {
    setTimeout(() => {
      this.isFocus = false;
    }, 200);
  }
  setValue(value: string) {
    console.log(this.value);
    this.value = value;
    this.search(this.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.filteredAutocompleteList == null) {
      this.filteredAutocompleteList = this.autocompleteList.filter((item) => {
        console.log(item);
        const itemSearch = item.toLowerCase();
        return itemSearch;
      });
    }
  }

}
