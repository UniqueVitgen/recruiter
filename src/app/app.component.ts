import { Component } from '@angular/core';
import {ModalWorker} from './workers/modal/modal.worker';
import set = Reflect.set;
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recruiter';
  isModalActive: boolean;
  constructor(public modalWorker: ModalWorker, matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    this.modalWorker.changeActive.subscribe(res => {
      this.isModalActive = res;
      console.log('modalActive', this.isModalActive);
    });
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/mdi.svg'));
  }
}
