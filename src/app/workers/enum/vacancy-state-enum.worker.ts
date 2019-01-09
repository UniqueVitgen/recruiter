import {Injectable} from '@angular/core';
import {VacancyState} from '../../enums/vacancy-state.enum';

@Injectable({
  providedIn: 'root'
})
export class VacancyStateEnumWorker {
  getValue(vacancyState: VacancyState) {
    if (vacancyState === VacancyState.OPEN) {
      return 1;
    } else if (vacancyState === VacancyState.CLOSE) {
      return 2;
    }
  }
}
