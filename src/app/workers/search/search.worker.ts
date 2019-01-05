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
  public searchObject(object: any, list: any[], property: string) {
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
