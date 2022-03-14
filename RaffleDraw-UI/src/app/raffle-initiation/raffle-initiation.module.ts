import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaffleInitiationRoutingModule } from './raffle-initiation-routing.module';
import { RaffleInitiationComponent } from './raffle-initiation.component';
import { InitiateRaffleComponent } from './components/initiate-raffle/initiate-raffle.component';
import { SelectRaffleComponent } from './components/select-raffle/select-raffle.component';
import { BeginRaffleComponent } from './components/begin-raffle/begin-raffle.component';
import { RunRaffleComponent } from './components/run-raffle/run-raffle.component';
import { WinnersListComponent } from './components/winners-list/winners-list.component';
import { InitiateRaffleFooterComponent } from './components/initiate-raffle-footer/initiate-raffle-footer.component';
import { SharedModule } from '../shared/shared.module';
import { RaffleDisplayComponent } from './components/raffle-display/raffle-display.component';

@NgModule({
  declarations: [RaffleInitiationComponent, InitiateRaffleComponent, SelectRaffleComponent, BeginRaffleComponent, RunRaffleComponent, WinnersListComponent, InitiateRaffleFooterComponent, RaffleDisplayComponent],
  imports: [
    CommonModule,
    RaffleInitiationRoutingModule,
    SharedModule
  ]
})
export class RaffleInitiationModule { }
