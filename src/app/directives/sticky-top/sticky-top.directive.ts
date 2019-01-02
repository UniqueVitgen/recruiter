import { Directive, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import {WindowScrollWorker} from '../../workers/window-scroll/window-scroll.worker';

enum StickyState {
  fixed = 'fixed',
  noFixed = 'no-fixed'
}

@Directive({
  selector: '[appStickyTop]'
})
export class StickyTopDirective {


  public scrollSubscription: Subscription = null;
  private fixedState = StickyState.noFixed;
  private initialOffsetFromTop = 0;
  private fixedViewportOffset = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private windowScroll: WindowScrollWorker,
    private element: ElementRef,
    private renderer: Renderer2) {
    this.initStickyElement();
  }


  public initStickyElement(){
    this.getInitialOffset();
    this.getFixedViewportOffset();

    if(isPlatformBrowser(this.platformId)){
      this.scrollSubscription = this.windowScroll.scroll$
        .subscribe(this.handleScroll.bind(this));
    }
  }

  private getInitialOffset(){
    let initialViewportOffset = this.element.nativeElement.getBoundingClientRect().top;
    let currentScroll = this.windowScroll.getCurrentScroll();
    this.initialOffsetFromTop = initialViewportOffset + currentScroll;
  }

  private getFixedViewportOffset(){
    //set the fixed class
    this.renderer.addClass(this.element.nativeElement, 'fixed');
    //save the view offset in fixed position
    this.fixedViewportOffset = this.element.nativeElement.getBoundingClientRect().top;
    //remove again the fixed class
    this.renderer.removeClass(this.element.nativeElement, 'fixed');
  }

  private handleScroll(currentScroll){

    //if not fixed
    //and we have not yet scrolled until the original position of the element
    //fix it
    if(this.fixedState == StickyState.noFixed &&
      currentScroll + this.fixedViewportOffset < this.initialOffsetFromTop){
      this.fixedState = StickyState.fixed;
      this.renderer.addClass(this.element.nativeElement, 'fixed');
    }
    //if fixed
    else if(this.fixedState == StickyState.fixed){
      let currentOffsetFromTop = currentScroll + this.element.nativeElement.getBoundingClientRect().top;
      //and the current offset from top is greater or equal than the original
      //unfix it
      if (currentOffsetFromTop >= this.initialOffsetFromTop){
        this.fixedState = StickyState.noFixed;
        this.renderer.removeClass(this.element.nativeElement, 'fixed');
      }
    }

  }

}
