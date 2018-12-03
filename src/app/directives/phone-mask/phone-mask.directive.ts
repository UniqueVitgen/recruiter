import { Directive } from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[appPhoneMask]',
  host: {
    '(ngModelChange)': 'onInputChange($event)',
    '(keydown.backspace)': 'onInputChange($event.target.value, true)'
  }
})
export class PhoneMaskDirective {
  constructor(public model: NgControl) {
  }
  onInputChange(event, backspace) {
    if (event) {
      let newVal = event.replace(/\D/g, '');
      if (backspace) {
        newVal = newVal.substring(0, newVal.length - 1);
      }
      if (newVal.length === 0) {
        newVal = '';
      } else if (newVal.length <= 3) {
        newVal = newVal.replace(/^(\d{0,3})/, '+375 ');
      } else if (newVal.length <= 5) {
        newVal = newVal.replace(/^(\d{0,3})(\d{0,2})/, '+375 $2 ');
      } else if (newVal.length <= 8) {
        newVal = newVal.replace(/^(\d{0,3})(\d{0,2})(\d{0,3})/, '+375 $2 $3');
      } else {
        newVal = newVal.replace(/^(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})(.*)/, '+375 $2 $3-$4-$5');
      }
      this.model.valueAccessor.writeValue(newVal);
    }
  }
}

