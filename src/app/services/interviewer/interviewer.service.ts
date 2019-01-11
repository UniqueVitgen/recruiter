import { Injectable } from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Observable} from 'rxjs';
import {Interview} from '../../classes/interview';
import {ServiceData} from '../../enums/service-data.enum';
import {Interviewer} from '../../classes/interviewer';

@Injectable({
  providedIn: 'root'
})
export class InterviewerService {

  constructor(private configService: ConfigService) { }

  get(id: number): Observable<Interviewer> {
      return this.configService.get('interviewer/' + id);
  }

  getAll(): Observable<Interviewer[]> {
    return this.configService.get('interviewers');
  }

  add(interview: Interviewer): Observable<Interviewer> {
    return this.configService.post('interviewers', interview);
  }

}
