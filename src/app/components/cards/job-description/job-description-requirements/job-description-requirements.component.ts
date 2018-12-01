import {Component, Input, OnInit} from '@angular/core';
import {Vacancy} from '../../../../classes/vacancy';

@Component({
  selector: 'app-job-description-requirements',
  templateUrl: './job-description-requirements.component.html',
  styleUrls: ['./job-description-requirements.component.scss']
})
export class JobDescriptionRequirementsComponent implements OnInit {
  @Input() vacancy: Vacancy;
  @Input() isMoreIcon: boolean;

  constructor() { }

  ngOnInit() {
  }

  clickEdit() {

  }

}
