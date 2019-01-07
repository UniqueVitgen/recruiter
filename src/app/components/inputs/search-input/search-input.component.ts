import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  @Input() isAdvancedSearch: boolean;
  @Output('onSearch') outputOnSearch: EventEmitter<string> = new EventEmitter();
  @Output('clickAdvancedSearch') outputClickAdvancedSearch: EventEmitter<boolean> = new EventEmitter();
  public isTurnOnAdvancedSearch: boolean;

  constructor() { }

  ngOnInit() {
  }
  search(value) {
    console.log(value);
    this.outputOnSearch.emit(value);
  }
  clickAdvancedSearch() {
    this.isTurnOnAdvancedSearch = !this.isTurnOnAdvancedSearch;
    this.outputClickAdvancedSearch.emit(this.isTurnOnAdvancedSearch);
  }

}
