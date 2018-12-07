import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  @Output('onSearch') outputOnSearch: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  search(value) {
    console.log(value);
    this.outputOnSearch.emit(value);
  }

}
