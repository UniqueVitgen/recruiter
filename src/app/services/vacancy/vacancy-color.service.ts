import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VacancyColorService {

  constructor() {
  }

  public isVacancyOpened(vacancyStatus: string): boolean {

    if (vacancyStatus === 'OPEN') {
      return true;
    }
    return false;

  }

  public isVacancySuspended(vacancyStatus: string): boolean {

    if (vacancyStatus === 'SUSPENDED') {
      return true;
    }
    return false;

  }

  public isVacancyCanceled(vacancyStatus: string): boolean {

    if (vacancyStatus === 'CANCELED') {
      return true;
    }
    return false;

  }

  public isVacancyClosed(vacancyStatus: string): boolean {

    if (vacancyStatus === 'CLOSE') {
      return true;
    }
    return false;

  }
}
