import { Injectable } from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Feedback} from '../../classes/feedback';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {


  constructor(private configService: ConfigService) { }

  get(feedback: Feedback): Observable<Feedback> {
    return this.configService.get('feedback/' + feedback.id);
  }

  add(feedback: Feedback): Observable<Feedback> {
    return this.configService.post('feedback', feedback);
  }

  update(feedback: Feedback): Observable<any> {
    return this.configService.put('feedback/' + feedback.id, feedback);
  }

  delete(feedback: Feedback): Observable<any> {
    return this.configService.delete('feedback/' + feedback.id);
  }
}
