import { Injectable } from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Observable} from 'rxjs';
import {Interview} from '../../classes/interview';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor(private configService: ConfigService) { }

  get(id: number): Observable<Interview> {
    return this.configService.get('interview/' + id);
  }

  getAll(): Observable<Interview[]> {
    return this.configService.get('interview');
  }

  add(interview: Interview): Observable<Interview> {
    return this.configService.post('interview', interview);
  }

  update(interview: Interview): Observable<Interview> {
    return this.configService.put('interview/' + interview.id, interview);
  }

  delete(interview: Interview): Observable<Interview> {
    return this.configService.delete('interview/' + interview.id)
  }
}
