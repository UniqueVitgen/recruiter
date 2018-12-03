import { Injectable } from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Observable} from 'rxjs';
import {InterviewFeedback} from '../../classes/interview-feedback';

@Injectable({
  providedIn: 'root'
})
export class InterviewFeedbackService {

  constructor(private configService: ConfigService) { }

  get(id: number): Observable<InterviewFeedback> {
    return this.configService.get('interview_feedback/' + id);
  }

  getAll(): Observable<InterviewFeedback[]> {
    return this.configService.get('interview_feedback');
  }

  add(interviewFeedback: InterviewFeedback): Observable<InterviewFeedback> {
    return this.configService.post('interview_feedback', interviewFeedback);
  }

  update(interviewFeedback: InterviewFeedback): Observable<InterviewFeedback> {
    return this.configService.put('interview_feedback/' + interviewFeedback.id, interviewFeedback);
  }

  delete(interviewFeedback: InterviewFeedback): Observable<any> {
    return this.configService.delete('interview_feedback/' + interviewFeedback.id);
  }
}
