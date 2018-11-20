import {Component, Input, OnInit} from '@angular/core';
import {Vacancy} from '../../../classes/vacancy';
import {Router} from '@angular/router';

@Component({
  selector: 'app-job-description-dashboard',
  templateUrl: './job-description-dashboard.component.html',
  styleUrls: ['./job-description-dashboard.component.scss']
})
export class JobDescriptionDashboardComponent implements OnInit {
  @Input() jobDescriptionList: Vacancy[];

  constructor(
    private router: Router) { }

  ngOnInit() {
  }

  goToJobDescriptionPage(vacancy: Vacancy) {
    console.log('job description');
    this.router.navigate(['job-description', vacancy.id]);
  }

}
