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

  public parseObject(object: any) {
    return JSON.parse(JSON.stringify(object));
  }

  public compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }
}
