import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TypeCheckingWorker} from '../../../workers/type-checking/type-checking.worker';

@Component({
  selector: 'app-job-description-filter-toolbar',
  templateUrl: './job-description-filter-toolbar.component.html',
  styleUrls: ['./job-description-filter-toolbar.component.scss']
})
export class JobDescriptionFilterToolbarComponent implements OnInit, OnChanges {
  @Input() statusesList: string[];
  _selectedStatusesList: string[];

  constructor(private typeCheckingWorker: TypeCheckingWorker) { }

  ngOnInit() {
  }
  @Input()
  get selectedStatuses() {
    return this._selectedStatusesList;
  }
  set selectedStatuses(statusesList: string[]) {
    this._selectedStatusesList = statusesList;
    this.selectedStatusesChanged.emit(this._selectedStatusesList);
  }
  @Output() selectedStatusesChanged: EventEmitter<string[]> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    // if (this._selectedStatusesList == null) {
    //   this._selectedStatusesList = this.typeCheckingWorker.parseObject(this.statusesList);
    // }
  }

}
