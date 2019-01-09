import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SortDirection} from '../../../enums/sort-direction.enum';
import {SortField} from '../../../classes/html/sort-field';

@Component({
  selector: 'app-sort-toolbar',
  templateUrl: './sort-toolbar.component.html',
  styleUrls: ['./sort-toolbar.component.scss']
})
export class SortToolbarComponent implements OnInit {
  @Input() sourceProperties: SortField[];
  @Input() sourceDirections: string[];
  @Input() selectedProperty: string;
  @Output() selectedPropertyChange: EventEmitter<string> = new EventEmitter();
  @Input() sortDirection: SortDirection;
  @Output() sortDirectionChange: EventEmitter<SortDirection> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  changeSelectedProperty() {
    this.selectedPropertyChange.emit(this.selectedProperty);
  }
  changeSortDirection() {
    this.sortDirectionChange.emit(this.sortDirection);
  }

}
