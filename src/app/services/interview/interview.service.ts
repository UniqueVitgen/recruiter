import {Injectable} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Observable} from 'rxjs';
import {Interview} from '../../classes/interview';
import {ServiceData} from '../../enums/service-data.enum';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor(private configService: ConfigService) { }

  get(id: number): Observable<Interview> {
    if (ConfigService.serviceData === ServiceData.Real) {
      return this.configService.get('interview/' + id);
    } else {
      return this.configService.createObservable(
          {
            'id': 0,
            'candidateId': 0,
            'vacancyId': 0,
            'planDate': '2018-11-30T16:36:28.076Z',
            'factDate': '2018-11-30T16:36:28.076Z'
          }
        );
    }
  }

  getAll(): Observable<Interview[]> {
    if (ConfigService.serviceData === ServiceData.Real) {
      return this.configService.get('interview');
    } else {
      this.configService.createObservable([{
        'id': 0,
        'candidateId': 0,
        'vacancyId': 0,
        'planDate': '2018-11-30T16:36:28.076Z',
        'factDate': '2018-11-30T16:36:28.076Z'
      }]);
    }
  }

  add(interview: Interview): Observable<Interview> {
    return this.configService.post('interview', interview);
  }

  update(interview: Interview): Observable<Interview> {
    return this.configService.put('interview/' + interview.id, interview);
  }

  delete(interview: Interview): Observable<any> {
    return this.configService.delete('interview/' + interview.id);
  }
}
