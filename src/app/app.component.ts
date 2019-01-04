import { Component } from '@angular/core';
import {ModalWorker} from './workers/modal/modal.worker';
import set = Reflect.set;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recruiter';
  isModalActive: boolean;
  constructor(public modalWorker: ModalWorker) {
    this.modalWorker.changeActive.subscribe(res => {
      this.isModalActive = res;
      console.log('modalActive', this.isModalActive);
    });
  }
}
