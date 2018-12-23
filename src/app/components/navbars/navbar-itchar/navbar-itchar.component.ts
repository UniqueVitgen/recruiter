import { Component, OnInit } from '@angular/core';
import {NavbarLink} from '../../../classes/html/navbar-link';
import {TranslateWorker} from '../../../workers/translate/translate.worker';

@Component({
  selector: 'app-navbar-itchar',
  templateUrl: './navbar-itchar.component.html',
  styleUrls: ['./navbar-itchar.component.scss']
})
export class NavbarItcharComponent implements OnInit {

  routes: NavbarLink[] = [
    {routerLink: '/candidate', title: 'Candidate Dashboard', isActive: true},
    {routerLink: '/job-description', title: 'Job Description Dashboard', isActive: false},
    {routerLink: '/calendar', title: 'Interview Calendar', isActive: false},
    {routerLink: '/interview/0', title: 'Interview', isActive: false}
  ];

  constructor(public translateWorker: TranslateWorker) { }

  ngOnInit() {
  }
  changeRoute(index: number) {
    this.routes.forEach((el, elIndex) => {
      if (index === elIndex) {
        el.isActive = true;
      } else {
        el.isActive = false;
      }
    });
  }

}
