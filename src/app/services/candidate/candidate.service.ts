import {Injectable} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Candidate} from 'src/app/classes/candidate';
import {Observable} from 'rxjs/index';
import {ServiceData} from '../../enums/service-data.enum';
import {ContactType} from '../../enums/contact-type.enum';
import {AttachmentType} from '../../enums/attachment-type.enum';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  mockCandidates: Candidate[] = [
    {
      id: 0,
      name: 'string',
      surname: 'string',
      birthday: 'string',
      salaryInDollars: 0,
      candidateState: {
        name: 'string'
      },
      skills: [
        {
          name: 'string'
        }
      ],
      experiences: [
        {
          dateFrom: 'string',
          dateTo: 'string',
          jobDescription: {
            id: 0,
            name: 'string'
          },
          jobPosition: 'string',
          companyName: {
            id: 0,
            name: 'string'
          }
        }
      ],
      contacts: [
        {
          contactType: ContactType.EMAIL,
          contactDetails: 'string'
        }
      ],
      attachments: [
        {
          attachmentType: AttachmentType.CV,
          filePath: 'string'
        }
      ],
      responsibilities: [
        {
          name: 'string'
        }
      ]
    },
    {
      id: 1,
      name: 'string',
      surname: 'string',
      birthday: 'string',
      salaryInDollars: 0,
      candidateState: {
        name: 'string'
      },
      skills: [
        {
          name: 'string'
        }
      ],
      experiences: [
        {
          dateFrom: 'string',
          dateTo: 'string',
          jobDescription: {
            id: 0,
            name: 'string'
          },
          jobPosition: 'string',
          companyName: {
            id: 0,
            name: 'string'
          }
        }
      ],
      contacts: [
        {
          contactType: ContactType.EMAIL,
          contactDetails: 'string'
        }
      ],
      attachments: [
        {
          attachmentType: AttachmentType.CV,
          filePath: 'string'
        }
      ],
      responsibilities: [
        {
          name: 'string'
        }
      ]
    }
  ];

  constructor(private configService: ConfigService) { }

  get(id: number): Observable<Candidate> {
    // if (ConfigService.serviceData === ServiceData.Real) {
      return this.configService.get('candidate/' + id)
        .pipe(map((element: Candidate) => {
          console.log('element');
          element.id = (element as any)._id;
          return element;
        }));
    // } else {
    //   return Observable.create(observableObject => {
    //     observableObject.next({
    //       'id': 0,
    //       'name': 'string',
    //       'surname': 'string',
    //       'birthday': 'string',
    //       'salaryInDollars': 0,
    //       'candidateState': {
    //         'name': 'string'
    //       },
    //       'skills': [
    //         {
    //           'name': 'string'
    //         }
    //       ],
    //       'experiences': [
    //         {
    //           'dateFrom': 'string',
    //           'dateTo': 'string',
    //           'jobDescription': {
    //             'id': 0,
    //             'name': 'string'
    //           },
    //           'jobPosition': 'string',
    //           'companyName': {
    //             'id': 0,
    //             'name': 'string'
    //           }
    //         }
    //       ],
    //       'contacts': [
    //         {
    //           'contactType': 'EMAIL',
    //           'contactDetails': 'string'
    //         }
    //       ],
    //       'attachments': [
    //         {
    //           'attachmentType': 'CV',
    //           'filePath': 'string'
    //         }
    //       ],
    //       'responsibilities': [
    //         {
    //           'name': 'string'
    //         }
    //       ]
    //     });
    //   });
    // }
  }
  getTest() {
    return this.configService.get('api/todos');
  }

  getAll(): Observable<Candidate[] | any> {
    console.log(ConfigService.serviceData);
    // if (ConfigService.serviceData === ServiceData.Real) {
      return this.configService.get('candidates')
        .pipe(map((elements: Candidate[]) => {
          console.log('elements', elements);
          const candidates = elements.map(element => {
            element.id = (element as any)._id;
            return element;
          });
          return candidates;
        }));
    // } else {
    //   return Observable.create(observ => {
    //     observ.next([
    //       {
    //         'id': 0,
    //         'name': 'string',
    //         'surname': 'string',
    //         'birthday': 'string',
    //         'salaryInDollars': 0,
    //         'candidateState': {
    //           'name': 'string'
    //         },
    //         'skills': [
    //           {
    //             'name': 'string'
    //           }
    //         ],
    //         'experiences': [
    //           {
    //             'dateFrom': 'string',
    //             'dateTo': 'string',
    //             'jobDescription': {
    //               'id': 0,
    //               'name': 'string'
    //             },
    //             'jobPosition': 'string',
    //             'companyName': {
    //               'id': 0,
    //               'name': 'string'
    //             }
    //           }
    //         ],
    //         'contacts': [
    //           {
    //             'contactType': 'EMAIL',
    //             'contactDetails': 'string'
    //           }
    //         ],
    //         'attachments': [
    //           {
    //             'attachmentType': 'CV',
    //             'filePath': 'string'
    //           }
    //         ],
    //         'responsibilities': [
    //           {
    //             'name': 'string'
    //           }
    //         ]
    //       }
    //     ]);
    //   });
    // }
  }

  add(candidate: Candidate): Observable<Candidate> {
    return this.configService.post('candidates', candidate);
  }

  update(candidate: Candidate): Observable<Candidate> {
    return this.configService.put('candidate/' + candidate.id, candidate);
  }

  delete(id: number): Observable<Candidate> {
    return this.configService.delete('candidate/' + id);
  }
}
