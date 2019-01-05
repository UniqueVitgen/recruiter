import { Injectable } from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Observable} from 'rxjs';
import {PositionModel} from '../../classes/position-model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private configService: ConfigService) { }
  public getAll(): Observable<PositionModel[]> {
    return this.configService.get('position');
  }
}
