import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchWorker {
  public search(value: string, stringList: string[]) {
    if (value) {
      value = value.toLowerCase();
      return stringList.filter( (string) => {
        string = string.toLowerCase();
        return string.indexOf(value) !== -1;
      });
    }
  }
  public searchValueInsideProperty(value: string, list: any[], property: string) {
    if (value != null) {
      value = value.toLowerCase();
      if (list) {
        return list.filter(item => {
          return item[property].toLowerCase().indexOf(value) > -1 && item[property];
        });
      }
    }
  }
  public searchObject<T>(object: T, list: T[], property: string) {
    if (object) {
      const value = object[property].toLowerCase();
      if (list) {
        return list.filter(item => {
          return item[property].toLowerCase().indexOf(value) > -1;
        });
      }
    }
  }
}
