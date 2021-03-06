import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumWorker {
  getKeysFromEnum(E: any): string[] {
    // const keys = []
    // for (var enumMember in E) {
    //   keys.push(enumMember);
    // }
    const keys = Object.keys(E); // ["A", "B"]
    // console.log('keys', keys);
    return keys;
  }

  getValuesFromEnum(E: any) {
    const keys = this.getKeysFromEnum(E);
    const values = keys.map(k => E[k as any]); // [0, 1]
    return values;
  }
}
