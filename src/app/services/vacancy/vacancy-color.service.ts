import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VacancyColorService {

  constructor() {
  }

  /*switch (vacancyStatus) {
        case 'OPEN':
          return 'green';
        case 'SUSPENDED':
          return 'yellow';
        case 'CANCELED':
          return 'gray';
        case 'CLOSE':
          return 'red';
        default:
          return 'black';
      }*/
  public isVacancyOpened(vacancyStatus: string): boolean {

    if (vacancyStatus === 'OPEN') return true;
    return false;

  }
  public isVacancySuspended(vacancyStatus: string): boolean {

    if (vacancyStatus === 'SUSPENDED') return true;
    return false;

  }

  public isVacancyCanceled(vacancyStatus: string): boolean {

    if (vacancyStatus === 'CANCELED') return true;
    return false;

  }

  public isVacancyClosed(vacancyStatus: string): boolean {

    if (vacancyStatus === 'CLOSE') return true;
    return false;

  }
}
