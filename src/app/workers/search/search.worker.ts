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
}
