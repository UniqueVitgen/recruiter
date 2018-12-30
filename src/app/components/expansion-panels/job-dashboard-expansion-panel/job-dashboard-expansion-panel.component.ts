  import {Component, Input, OnInit} from '@angular/core';
  import {Vacancy} from '../../../classes/vacancy';

@Component({
  selector: 'app-job-dashboard-expansion-panel',
  templateUrl: './job-dashboard-expansion-panel.component.html',
  styleUrls: ['./job-dashboard-expansion-panel.component.scss']
})
export class JobDashboardExpansionPanelComponent implements OnInit {
  @Input() vacancy: Vacancy;

  constructor() { }

  ngOnInit() {
  }

}
