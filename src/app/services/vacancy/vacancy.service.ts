import {Injectable} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Observable} from 'rxjs';
import {Vacancy} from '../../classes/vacancy';
import {Candidate} from '../../classes/candidate';
import {ServiceData} from '../../enums/service-data.enum';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  constructor(private configService: ConfigService) { }

  get(id: number): Observable<Vacancy> {
    if (ConfigService.serviceData === ServiceData.Real) {
      return this.configService.get('vacancy/' + id);
    } else {
      return this.configService.createObservable(
        {
          'id': 0,
          'position': 'string',
          'salaryInDollarsFrom': 0,
          'salaryInDollarsTo': 0,
          'vacancyState': 'OPEN',
          'experienceYearsRequire': 0,
          'developerId': 0,
          'skills': [
            {
              'name': 'string'
            }
          ],
          'requirements': [
            {
              'name': 'string'
            }
          ]
        }
      );
    }
  }

  getAll(): Observable<Vacancy[]> {
    if (ConfigService.serviceData === ServiceData.Real) {
      return this.configService.get('vacancies');
    } else {
      return this.configService.createObservable(
        [{
          'id': 0,
          'position': 'string',
          'salaryInDollarsFrom': 0,
          'salaryInDollarsTo': 0,
          'vacancyState': 'OPEN',
          'experienceYearsRequire': 0,
          'developerId': 0,
          'skills': [
            {
              'name': 'string'
            }
          ],
          'requirements': [
            {
              'name': 'string'
            }
          ]
        }]);
    }
  }

  add(vacancy: Vacancy): Observable<Vacancy> {
    return this.configService.post('vacancies', vacancy);
  }

  getCandidates(vacancy: Vacancy): Observable<Candidate[]> {
    if (ConfigService.serviceData === ServiceData.Real) {
      return this.configService.get('vacancy/' + vacancy.id + '/candidates');
    } else {
      return this.configService.createObservable([
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
    }
  }

  update(vacancy: Vacancy): Observable<Vacancy> {
    return this.configService.put('vacancy/' + vacancy.id, vacancy);
  }

  delete(vacancy: Vacancy): Observable<Vacancy> {
    return this.configService.delete('vacancy/' + vacancy.id);
  }
}
