import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayWorker {
  removeElement<T>(array: T[], element: T) {
    const arrayCopy = array.slice();
    const index = arrayCopy.indexOf(element);
    arrayCopy.splice(index, 1);
    return arrayCopy;
  }
}