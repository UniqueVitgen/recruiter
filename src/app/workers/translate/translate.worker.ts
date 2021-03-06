import {EventEmitter, Injectable} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import localeRussian from '@angular/common/locales/ru';
import localeEnglish from '@angular/common/locales/en';
import {DateAdapter} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class TranslateWorker {
  title: string = 'language';
  changeValue: EventEmitter<any> = new EventEmitter();
  constructor(public translateService: TranslateService,
              private adapter: DateAdapter<any>
  ) {
    translateService.addLangs(['en', 'ru']);
    translateService.setDefaultLang('en');
    this.setLanguage(this.getLanguage());
    this.translateService.onLangChange.subscribe(res => {
      this.changeValue.emit(res);
    });
  }

  setLanguage(language: string) {
    localStorage.setItem(this.title, language);        // Register locale data since only the en-US locale data comes with Angular
    switch (language) {
      case 'en': {
        registerLocaleData(localeEnglish);
        break;
      }
      case 'ru': {
        registerLocaleData(localeRussian);
        break;
      }
    }
    this.adapter.setLocale(language);
    this.translateService.use(language);
  }

  getLanguage() {
    let language = localStorage.getItem(this.title);
    if (language == null) {
      const browserLang = this.translateService.getBrowserLang();
      language = browserLang.match(/en|ru/) ? browserLang : 'en';
    }
    return language;
  }
  translateWord(key) {
    return this.translateService.instant(key);
    // this.translatePipe.transform(key);
  }
}
