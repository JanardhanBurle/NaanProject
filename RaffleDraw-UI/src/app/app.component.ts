import { Component, OnInit, OnDestroy } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { Subscription } from 'rxjs';
import { LanguageTranslateService } from './shared/services/language-translate.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, OnDestroy {
  title = 'RaffleDrawUI';
  layoutDirection: Direction;
  private subscription: Subscription;
  isEnglish = true;
  constructor(private langTranslate: LanguageTranslateService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.subscribeToDirection();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private subscribeToDirection(): void {
    this.subscription = this.langTranslate.getLayoutDirection().subscribe((res: any) => {
      this.layoutDirection = res;
      if (this.layoutDirection === 'rtl') {
        this.translate.setDefaultLang('ar');

      } else {
        this.translate.setDefaultLang('en');

      }
    });
  }


  onToggleChange() {
    this.isEnglish = !this.isEnglish;
    this.langTranslate.enableRTL(this.isEnglish);
  }

}
