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
    const targetArray = array.map(value => {
      return value[property];
    }).filter(value => {
      return value != null;
    });
    const resultMax = Math.max(...targetArray);
    if (isFinite(resultMax)) {
      return resultMax;
    }
  }
  public calculateMaxSimpleArray(array) {
    return Math.max(...array);
  }
  public calculateMin(array, property: string) {
    const targetArray = array.map(value => {
      return value[property];
    }).filter(value => {
      return value != null;
    });
    const resultMin = Math.min(...targetArray);
    if (isFinite(resultMin)) {
      console.log('isFiniteMin', property, resultMin);
      return resultMin;
    }
  }
  public calculateMinSimpleArray(array) {
    return Math.min(...array);
  }
}
