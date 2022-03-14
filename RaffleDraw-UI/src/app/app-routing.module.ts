import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'raffle-home', loadChildren: () => import('src/app/raffle-home/raffle-home.module').then(m => m.RaffleHomeModule) },
  { path: 'login', loadChildren: () => import('src/app/authorization/authorization.module').then(m => m.AuthorizationModule) },
  { path: 'raffle-initiation', loadChildren: () => import('src/app/raffle-initiation/raffle-initiation.module').then(m => m.RaffleInitiationModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
