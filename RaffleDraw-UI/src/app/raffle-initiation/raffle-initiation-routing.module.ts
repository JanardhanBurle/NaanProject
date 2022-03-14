import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitiateRaffleComponent } from './components/initiate-raffle/initiate-raffle.component';
import { SelectRaffleComponent } from './components/select-raffle/select-raffle.component';
import { BeginRaffleComponent } from './components/begin-raffle/begin-raffle.component';
import { WinnersListComponent } from './components/winners-list/winners-list.component';
import { RaffleInitiationComponent } from './raffle-initiation.component';
import { RunRaffleComponent } from './components/run-raffle/run-raffle.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: RaffleInitiationComponent, children: [
      { path: 'initiate-raffle', component: InitiateRaffleComponent },
      { path: 'select-raffle', component: SelectRaffleComponent },
      { path: 'begin-raffle', component: BeginRaffleComponent },
      { path: 'run-raffle', component: RunRaffleComponent, canActivate: [AuthGuard] },
      { path: 'winners-list', component: WinnersListComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'initiate-raffle', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'raffle-initiation', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaffleInitiationRoutingModule { }
