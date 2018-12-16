import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Vacancy} from '../../../../classes/vacancy';

@Component({
  selector: 'app-job-description-dashboard-item',
  templateUrl: './job-description-dashboard-item.component.html',
  styleUrls: ['./job-description-dashboard-item.component.scss']
})
export class JobDescriptionDashboardItemComponent implements OnInit {
  @Input() jobDescription: Vacancy;
  @Output('deleteVacancy') outputDeleteVacancy: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  deleteVacancy(index: number) {
    this.outputDeleteVacancy.emit(index);
  }
}
