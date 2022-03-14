import { Directive, HostListener } from '@angular/core';

import * as screenfull from 'screenfull';
import { Input } from '@angular/core';

@Directive({
  selector: '[appScreenfull]'
})
export class ScreenfullDirective {
  @Input('appScreenfull') appScreenfull: string;
  constructor() { }

  @HostListener('click') onClick() {
    if (this.appScreenfull === 'enable') {
      screenfull.request();
    } else {
      screenfull.exit();
    }
  }
}
