



import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appLoginPin]'
})
export class LoginPinDirective {
  @Input() appLoginPin: string;
  // Allow decimal numbers and negative values
  private regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-'];

  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    let inputValue = new String(this.appLoginPin);
    if (inputValue.length <= 2) {
      // Allow Backspace, tab, end, and home keys
      if (this.specialKeys.indexOf(event.key) !== -1) {
        return;
      }
      let current: string = this.el.nativeElement.value;
      let next: string = current.concat(event.key);
      if (next && !String(next).match(this.regex)) {
        event.preventDefault();
      }
    } else {
      if (this.specialKeys.indexOf(event.key) !== -1) {
        return;
      }
      event.preventDefault();

    }

  }
}