import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentHubSharedModule } from 'projects/payment-hub/src/app/app.shared.module';
import { EStatementsSharedModule } from 'projects/e-statements/src/app/app.shared.module';


const routes: Routes = [
  {
    path: 'payment-hub',
    loadChildren: '../../projects/payment-hub/src/app/app.shared.module#PaymentHubSharedModule'
  },
  {
    path: 'e-statements',
    loadChildren: '../../projects/e-statements/src/app/app.shared.module#EStatementsSharedModule'
  },
  { path: '', redirectTo: '/payment-hub', pathMatch: 'full' },
  { path: '**', redirectTo: '/e-statements', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  PaymentHubSharedModule.forRoot(),
  EStatementsSharedModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
