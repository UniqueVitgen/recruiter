import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-candidate-avatar',
  templateUrl: './candidate-avatar.component.html',
  styleUrls: ['./candidate-avatar.component.scss']
})
export class CandidateAvatarComponent implements OnInit {
  @Input() src: string;

  constructor() { }

  ngOnInit() {
  }

}
