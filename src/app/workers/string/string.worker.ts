import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringWorker {
  public capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
