import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SortDirection} from '../../../enums/sort-direction.enum';
import {SortField} from '../../../classes/html/sort-field';

@Component({
  selector: 'app-candidate-sort-toolbar',
  templateUrl: './candidate-sort-toolbar.component.html',
  styleUrls: ['./candidate-sort-toolbar.component.scss']
})
export class CandidateSortToolbarComponent implements OnInit {
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
