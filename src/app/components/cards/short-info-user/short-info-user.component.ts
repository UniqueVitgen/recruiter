import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from 'src/app/classes/candidate';

@Component({
  selector: 'app-short-info-user',
  templateUrl: './short-info-user.component.html',
  styleUrls: ['./short-info-user.component.scss']
})
export class ShortInfoUserComponent implements OnInit {
  @Input() candidate: Candidate;

  constructor() { }

  ngOnInit() {
  }

}
