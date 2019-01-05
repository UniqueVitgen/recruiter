import { Injectable } from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Observable} from 'rxjs';
import {Team} from '../../classes/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private configService: ConfigService) { }
  public getAll(): Observable<Team[]> {
    return this.configService.get('team');
  }
}
