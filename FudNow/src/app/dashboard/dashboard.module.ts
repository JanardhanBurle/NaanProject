import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';
import { DiningMenuComponent } from './components/dining-menu/dining-menu.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { FlipModule } from 'ngx-flip';
// other imports
const injectableRxStompConfig: InjectableRxStompConfig = {
  // Which server?
  brokerURL: 'ws://104.251.211.184:8080/fudnowapi/live?restaraunt=1',

  // Headers
  // Typical keys: login, passcode, host
  connectHeaders: {
    login: 'guest',
    passcode: 'guest'
  },
  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds
  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 5000 (5 seconds)
  reconnectDelay: 500,

  // Will log diagnostics on console
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }
};
@NgModule({
  declarations: [DashboardComponent,
    SpecialOffersComponent,
    DiningMenuComponent,
    MenuItemComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MDBBootstrapModule.forRoot(),
    FlipModule,
    SharedModule

  ],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: injectableRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }],

})
export class DashboardModule { }
