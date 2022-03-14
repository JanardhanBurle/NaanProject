import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageTranslateService {

  private dir = new BehaviorSubject<string>('ltr');
  constructor() { }

  enableRTL(status: boolean) {
    let dir;
    if (status) {
      dir = 'rtl';
    } else {
      dir = 'ltr';
    }
    this.dir.next(dir);
  }

  getLayoutDirection() {
    return this.dir.asObservable();
  }

}
