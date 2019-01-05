import {Component, Input, OnInit} from '@angular/core';
import {PositionModel} from '../../../classes/position-model';

@Component({
  selector: 'app-position-input',
  templateUrl: './position-input.component.html',
  styleUrls: ['./position-input.component.scss']
})
export class PositionInputComponent implements OnInit {
  @Input() positions: PositionModel[];

  constructor() { }

  ngOnInit() {
  }
  // changePosition() {
  //   this.selectedPositions = this.searchWorker.searchObject(this.editedExperience.jobPosition, this.positions, 'name');
  // }

}
