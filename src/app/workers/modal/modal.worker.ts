import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalWorker {
  public isActive;
  public changeActive: EventEmitter<boolean> = new EventEmitter<boolean>();
  setActive(isActive: boolean): void {
    this.isActive = isActive;
    this.changeActive.emit(this.isActive);
  }
  getActive(): boolean {
    return this.isActive;
  };
}
