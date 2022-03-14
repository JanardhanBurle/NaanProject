import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutherizationRoutingModule } from './autherization-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedRoutingModule } from '../shared/shared-routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AutherizationRoutingModule,
    SharedRoutingModule,
    SharedModule
  ]
})
export class AutherizationModule { }
