import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {

  @Input() isCorrect: Boolean = false;
  constructor(private el: ElementRef, private render: Renderer2) { }
  @HostListener('click') answer(){
    if(this.isCorrect){
      this.render.addClass(this.el.nativeElement, 'bg-success');
    } else {
      this.render.addClass(this.el.nativeElement, 'bg-danger');
    }
  }
}
