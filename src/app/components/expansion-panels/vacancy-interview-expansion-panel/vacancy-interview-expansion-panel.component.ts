import {Component, Input, OnInit} from '@angular/core';
import {Vacancy} from '../../../classes/vacancy';

@Component({
  selector: 'app-vacancy-interview-expansion-panel',
  templateUrl: './vacancy-interview-expansion-panel.component.html',
  styleUrls: ['./vacancy-interview-expansion-panel.component.scss']
})
export class VacancyInterviewExpansionPanelComponent implements OnInit {
  @Input() vacancy: Vacancy;

  constructor() { }

  ngOnInit() {
  }

}
