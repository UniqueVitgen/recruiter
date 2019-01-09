import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  @Input() isAdvancedSearch: boolean;
  @Input() autocompleteList: string[];
  @Output('onSearch') outputOnSearch: EventEmitter<string> = new EventEmitter();
  @Output('clickAdvancedSearch') outputClickAdvancedSearch: EventEmitter<boolean> = new EventEmitter();
  value: string;
  private filteredAutocompleteList: string[];
  public isTurnOnAdvancedSearch: boolean;

  constructor() { }

  ngOnInit() {
  }
  search(value: string) {
    console.log(value);
    this.value = value;
    const searchValue = value.toLowerCase();
    if (this.autocompleteList) {
      this.filteredAutocompleteList = this.autocompleteList.filter((item) => {
        const itemSearch = item.toLowerCase();
        return itemSearch.indexOf(searchValue) > -1;
      });
    }
    this.outputOnSearch.emit(value);
  }
  clickAdvancedSearch() {
    this.isTurnOnAdvancedSearch = !this.isTurnOnAdvancedSearch;
    this.outputClickAdvancedSearch.emit(this.isTurnOnAdvancedSearch);
  }

}
