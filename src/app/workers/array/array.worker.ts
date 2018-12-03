import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayWorker {
  public removeElement<T>(array: T[], element: T): T[] {
    const arrayCopy = array.slice();
    const index = arrayCopy.indexOf(element);
    arrayCopy.splice(index, 1);
    return arrayCopy;
  }

  public removeElementByValue<T>(array: T[], element: T) {

  }
  public removeElementByIndex<T>(array: T[], index: number) {
    const arrayCopy = array.slice();
    arrayCopy.splice(index, 1);
    return arrayCopy;
  }
}
