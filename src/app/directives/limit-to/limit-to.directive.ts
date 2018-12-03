import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[appLimitTo]',
  host: {
    '(keypress)': '_onKeypress($event)',
  }
})
export class LimitToDirective {

  @Input('limit-to') limitTo;
  _onKeypress(e) {
    const limit = +this.limitTo;
    if (e.target.value.length === limit) { e.preventDefault(); }
  }

}
