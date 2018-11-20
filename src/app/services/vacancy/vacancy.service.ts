import { Injectable } from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Observable} from 'rxjs';
import {Vacancy} from '../../classes/vacancy';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  constructor(private configService: ConfigService) { }

  get(id: number): Observable<Vacancy> {
    return this.configService.get('vacancy/' + id);
  }

  getAll(): Observable<Vacancy[]> {
    return this.configService.get('vacancies');
  }

  add(vacancy: Vacancy): Observable<Vacancy> {
    return this.configService.post('vacancies', vacancy);
  }

  update(vacancy: Vacancy): Observable<Vacancy> {
    return this.configService.put('vacancy/' + vacancy.id, vacancy);
  }

  delete(vacancy: Vacancy): Observable<Vacancy> {
    return this.configService.delete('vacancy/' + vacancy.id);
  }
}
