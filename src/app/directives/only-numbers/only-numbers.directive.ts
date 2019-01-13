import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[only-numbers]'
})
export class OnlyNumbersDirective {
  private regex: RegExp = new RegExp(/^[1-9][0-9]*(\.[0-9]*)?$/g);

  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ];

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent) {
      if (this.specialKeys.indexOf(event.key) !== -1) {
          return;
      }
      setTimeout(() => {
        console.log('123', this.el.nativeElement.value.indexOf('.')); }, 0);

      let current: string = this.el.nativeElement.value;

      let next: string = current.slice(0, this.el.nativeElement.selectionStart) +
        event.key + current.slice(this.el.nativeElement.selectionStart);

      if (next && !String(next).match(this.regex)) {
          event.preventDefault();
      }
  }

}
