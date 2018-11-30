import {Injectable} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Candidate} from 'src/app/classes/candidate';
import {Observable} from 'rxjs/index';
import {ServiceData} from '../../enums/service-data.enum';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private configService: ConfigService) { }

  get(id: number): Observable<Candidate> {
    if (ConfigService.serviceData === ServiceData.Real) {
      return this.configService.get('candidate/' + id);
    } else {
      return Observable.create(observableObject => {
        observableObject.next({
          'id': 0,
          'name': 'string',
          'surname': 'string',
          'birthday': 'string',
          'salaryInDollars': 0,
          'candidateState': {
            'name': 'string'
          },
          'skills': [
            {
              'name': 'string'
            }
          ],
          'experiences': [
            {
              'dateFrom': 'string',
              'dateTo': 'string',
              'jobDescription': {
                'id': 0,
                'name': 'string'
              },
              'jobPosition': 'string',
              'companyName': {
                'id': 0,
                'name': 'string'
              }
            }
          ],
          'contacts': [
            {
              'contactType': 'EMAIL',
              'contactDetails': 'string'
            }
          ],
          'attachments': [
            {
              'attachmentType': 'CV',
              'filePath': 'string'
            }
          ],
          'responsibilities': [
            {
              'name': 'string'
            }
          ]
        });
      });
    }
  }

  getAll(): Observable<Candidate[] | any> {
    console.log(ConfigService.serviceData);
    if (ConfigService.serviceData === ServiceData.Real) {
      return this.configService.get('candidates');
    } else {
      return Observable.create(observ => {
        observ.next([
          {
            'id': 0,
            'name': 'string',
            'surname': 'string',
            'birthday': 'string',
            'salaryInDollars': 0,
            'candidateState': {
              'name': 'string'
            },
            'skills': [
              {
                'name': 'string'
              }
            ],
            'experiences': [
              {
                'dateFrom': 'string',
                'dateTo': 'string',
                'jobDescription': {
                  'id': 0,
                  'name': 'string'
                },
                'jobPosition': 'string',
                'companyName': {
                  'id': 0,
                  'name': 'string'
                }
              }
            ],
            'contacts': [
              {
                'contactType': 'EMAIL',
                'contactDetails': 'string'
              }
            ],
            'attachments': [
              {
                'attachmentType': 'CV',
                'filePath': 'string'
              }
            ],
            'responsibilities': [
              {
                'name': 'string'
              }
            ]
          }
        ]);
      });
    }
  }

  add(candidate: Candidate): Observable<Candidate> {
    return this.configService.post('candidates', candidate);
  }

  update(candidate: Candidate): Observable<Candidate> {
    return this.configService.put('candidate/' + candidate.id, candidate);
  }

  delete(candidate: Candidate): Observable<Candidate> {
    return this.configService.delete('candidate/' + candidate.id);
  }
}
