import {Component, Input, OnInit} from '@angular/core';
import {Vacancy} from '../../../classes/vacancy';

@Component({
  selector: 'app-job-description-short-info',
  templateUrl: './job-description-short-info.component.html',
  styleUrls: ['./job-description-short-info.component.scss']
})
export class JobDescriptionShortInfoComponent implements OnInit {
  @Input() vacancy: Vacancy;

  constructor() { }

  ngOnInit() {
  }

}
