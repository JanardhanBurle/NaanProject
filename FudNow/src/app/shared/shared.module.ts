import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LoaderComponent } from './components/loader/loader.component';
import { LoginPinDirective } from './directives/login-pin.directive';
import { PreMenuStartComponent } from './components/pre-menu-start/pre-menu-start.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';

@NgModule({
  declarations: [LoaderComponent, LoginPinDirective, PreMenuStartComponent, CountdownTimerComponent],
  exports: [LoaderComponent, LoginPinDirective, PreMenuStartComponent],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
