import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RaffleHomeRoutingModule } from "./raffle-home-routing.module";
import { RaffleHomeComponent } from "./raffle-home.component";
import { SharedModule } from "../shared/shared.module";
import { RaffleComponent } from "./components/raffle/raffle.component";
import { PromotionComponent } from "./components/promotion/promotion.component";
import { ReportsComponent } from "./components/reports/reports.component";
import {
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatInputModule,
  MatSortModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatBadgeModule,
  MatSnackBarModule,
} from "@angular/material";
import { CreateRaffleComponent } from "./components/create-raffle/create-raffle.component";
import { Ng2OdometerModule } from "ng2-odometer";
import { CreatePromotionComponent } from "./components/create-promotion/create-promotion.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ReactiveFormsModule } from "@angular/forms";
import { SnackComponent } from "./components/snackComponent/snackbar.component";
import { AdministrationComponent } from "./components/administration/administration.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { UserManagementComponent } from "./components/user-management/user-management.component";
import { RaffleManagementComponent } from "./components/raffle-management/raffle-management.component";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { RemoveUserComponent } from "./components/remove-user/remove-user.component";
import { AddUserToRaffleComponent } from "./components/add-user-to-raffle/add-user-to-raffle.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { RemoveUserToRaffleComponent } from "./components/remove-user-to-raffle/remove-user-to-raffle.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgxPopperModule } from "ngx-popper";
import { EditUserComponent } from "./components/edit-user/edit-user.component";
import { ViewUserComponent } from "./components/view-user/view-user.component";
import { UserRafflesComponent } from "./components/user-raffles/user-raffles.component";
import { RaffleDashboardComponent } from "./components/raffle-dashboard/raffle-dashboard.component";
import { MatCardModule } from "@angular/material/card";
import { CountdownTimerModule } from "ngx-countdown-timer";
import { RunRaffleComponent } from "./components/run-raffle/run-raffle.component";
@NgModule({
  declarations: [
    RaffleHomeComponent,
    RaffleComponent,
    PromotionComponent,
    ReportsComponent,
    CreateRaffleComponent,
    CreatePromotionComponent,
    SnackComponent,
    AdministrationComponent,
    UserManagementComponent,
    RaffleManagementComponent,
    AddUserComponent,
    RemoveUserComponent,
    AddUserToRaffleComponent,
    ChangePasswordComponent,
    RemoveUserToRaffleComponent,
    EditUserComponent,
    ViewUserComponent,
    UserRafflesComponent,
    RaffleDashboardComponent,
    RunRaffleComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RaffleHomeRoutingModule,
    SharedModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    Ng2OdometerModule.forRoot(),
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatTooltipModule,
    NgxPopperModule,
    MatCardModule,
    CountdownTimerModule.forRoot(),
  ],
  providers: [MatDatepickerModule],
  entryComponents: [
    CreateRaffleComponent,
    CreatePromotionComponent,
    SnackComponent,
    AddUserComponent,
    RemoveUserComponent,
    AddUserToRaffleComponent,
    RemoveUserToRaffleComponent,
    ChangePasswordComponent,
    UserRafflesComponent,
    RunRaffleComponent,
  ],
})
export class RaffleHomeModule {}
