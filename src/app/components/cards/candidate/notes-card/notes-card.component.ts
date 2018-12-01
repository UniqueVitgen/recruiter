import {Component, Input, OnInit} from '@angular/core';
import {Notes} from 'src/app/classes/notes';

@Component({
  selector: 'app-notes-card',
  templateUrl: './notes-card.component.html',
  styleUrls: ['./notes-card.component.scss']
})
export class NotesCardComponent implements OnInit {
  @Input() notes: Notes;
  constructor() { }

  ngOnInit() {
  }
}
