import { Injectable } from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Feedback} from '../../classes/feedback';
import {Observable} from 'rxjs';
import {DevFeedback} from '../../classes/dev-feedback';
import {Interview, InterviewExtended} from '../../classes/interview';

@Injectable({
  providedIn: 'root'
})
export class DevFeedbackService {

  constructor(private configService: ConfigService) { }

  get(feedback: DevFeedback): Observable<DevFeedback> {
    return this.configService.get('dev_feedback/' + feedback.id);
  }
  getByInterview(interview: InterviewExtended): Observable<DevFeedback> {
    return this.configService.get('dev_feedback/interview/' + interview.id);
  }

  add(feedback: DevFeedback): Observable<DevFeedback> {
    return this.configService.post('dev_feedback', feedback);
  }

  update(feedback: DevFeedback): Observable<any> {
    return this.configService.put('dev_feedback/' + feedback.id, feedback);
  }

  delete(feedback: DevFeedback): Observable<any> {
    return this.configService.delete('dev_feedback/' + feedback.id);
  }
}
