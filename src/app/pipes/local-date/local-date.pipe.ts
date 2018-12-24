import { Pipe, PipeTransform } from '@angular/core';
import {formatDate} from '@angular/common';
import {TranslateWorker} from '../../workers/translate/translate.worker';

@Pipe({
  name: 'localDate'
})
export class LocalDatePipe implements PipeTransform {

  constructor(private translateWorker: TranslateWorker) { }

  transform(value: any, format: string) {

    if (!value) { return ''; }
    if (!format) { format = 'shortDate'; }

    return formatDate(value, format, this.translateWorker.getLanguage());
  }

}
