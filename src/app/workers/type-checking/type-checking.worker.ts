import {Injectable, Type} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeCheckingWorker {
  public hasKey<K extends string>(k: K, o: any): o is { [_ in K]: any } {
    return typeof o === 'object' && k in o;
  }

  public checkType(o: Object, type) {
  }
}