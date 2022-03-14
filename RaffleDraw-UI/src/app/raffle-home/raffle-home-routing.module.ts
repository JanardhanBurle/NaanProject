import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RaffleHomeComponent } from './raffle-home.component';
import { RaffleComponent } from './components/raffle/raffle.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { RaffleManagementComponent } from './components/raffle-management/raffle-management.component';
import { RaffleDashboardComponent } from './components/raffle-dashboard/raffle-dashboard.component';

const routes: Routes = [
  {
    path: '', component: RaffleHomeComponent, children:
      [
        { path: 'dashboard', component: RaffleDashboardComponent },
        { path: 'raffle', component: RaffleComponent },
        { path: 'promotion', component: PromotionComponent },
        { path: 'reports', component: ReportsComponent },
        {
          path: 'administration', component: AdministrationComponent, children: [
            {
              path: 'user-management',
              component: UserManagementComponent
            },
            {
              path: 'raffle-management',
              component: RaffleManagementComponent
            },
            {
              path: '',
              redirectTo: 'user-management',
              pathMatch: 'full'
            }
          ]
        },
        { path: '', redirectTo: 'raffle', pathMatch: 'full' }
      ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaffleHomeRoutingModule { }
