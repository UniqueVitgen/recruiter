import {Component, Input, OnInit} from '@angular/core';
import { Candidate } from 'src/app/classes/candidate';

@Component({
  selector: 'app-contacts-user',
  templateUrl: './contacts-user.component.html',
  styleUrls: ['./contacts-user.component.scss']
})
export class ContactsUserComponent implements OnInit {
  @Input() candidate: Candidate;
  constructor() { }

  ngOnInit() {
  }

}
