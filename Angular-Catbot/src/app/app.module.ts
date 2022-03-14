import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentHubSharedModule } from '../../projects/payment-hub/src/app/app.shared.module';
import { NgModule } from '@angular/core';
import { EStatementsSharedModule } from '../../projects/e-statements/src/app/app.shared.module';
import { CbCoreModule } from '../../projects/cb-core/src/public-api';
import { ChatBotModule } from './chat-bot/chat-bot.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaymentHubSharedModule.forRoot(),
    EStatementsSharedModule.forRoot(),
    CbCoreModule,
    AngularMaterialModule,
    ChatBotModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
