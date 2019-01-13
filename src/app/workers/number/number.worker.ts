import { Injectable } from '@angular/core';
import {TranslateWorker} from '../translate/translate.worker';

@Injectable({
  providedIn: 'root'
})
export class NumberWorker {
  constructor(private translateWorker: TranslateWorker) {}

  formatYears(years: number): string {
    if (this.isValidNumber(years)) {
      let addedWord: string;
      if (years === 1) {
        addedWord = 'yearsC';
      } else if (years % 10 === 1 && years !== 11 && years !== 1) {
        addedWord = 'year';
      } else if ((years % 10 === 2 && years !== 12) || (years % 10 === 3 && years !== 13) || (years % 10 === 4 && years !== 14)) {
        addedWord = 'yearsA';
      } else {
        addedWord = 'yearsB';
      }
      return years + ' ' + this.translateWorker.translateWord(addedWord);
    }
  }
  isValidNumber(value: number): boolean {
    if (value != null) {
      return (isFinite(value) && value.toString() !== '');
    }
  }
}
