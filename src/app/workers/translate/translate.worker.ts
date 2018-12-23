import {EventEmitter, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

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
    translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
    this.translate.onLangChange.subscribe(res => {
      this.changeValue.emit(res);
    });
  }

  setLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem(this.title, language);
  }

  getLanguage() {
   return localStorage.getItem(this.title);
  }
}
