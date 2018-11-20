import { Component, OnInit } from '@angular/core';
import {NavbarLink} from '../../../classes/html/navbar-link';

@Component({
  selector: 'app-navbar-itchar',
  templateUrl: './navbar-itchar.component.html',
  styleUrls: ['./navbar-itchar.component.scss']
})
export class NavbarItcharComponent implements OnInit {

  routes: NavbarLink[] = [
    {routerLink: '/candidate', title: 'Candidate Dashboard', isActive: true},
    {routerLink: '/job-description', title: 'Job Description Dashboard', isActive: false}
  ];

  constructor() { }

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
