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
  public calculateMax(array, property: string) {
    return Math.max(...array.map(value => {
      return value[property];
    }));
  }
  public calculateMin(array, property: string) {
    return Math.min(...array.map(value => {
      return value[property];
    }));
  }
}
