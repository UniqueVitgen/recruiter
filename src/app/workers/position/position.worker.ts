import {EventEmitter, Injectable} from '@angular/core';
import {PositionModel} from '../../classes/position-model';

@Injectable({
  providedIn: 'root'
})
export class PositionWorker {
  getStringKeys(positions: PositionModel[]): string[] {
    return positions.map(item => {
      return item.name;
    });
  }
}
