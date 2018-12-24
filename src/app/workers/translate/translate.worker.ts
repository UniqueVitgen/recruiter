import {EventEmitter, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import localeRussian from '@angular/common/locales/ru';
import localeEnglish from '@angular/common/locales/en';

@Injectable({
  providedIn: 'root'
})
export class TranslateWorker {
  title: string = 'language';
  changeValue: EventEmitter<any> = new EventEmitter();
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    this.setLanguage(browserLang.match(/en|ru/) ? browserLang : 'en');
    this.translate.onLangChange.subscribe(res => {
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
    this.translate.use(language);
  }

  getLanguage() {
    let language = localStorage.getItem(this.title);
    if (language == null) {
      language = 'en';
    }
    return language;
  }
}
