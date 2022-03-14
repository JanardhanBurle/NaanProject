import { NgModule, ErrorHandler } from '@angular/core';
import { CbCoreComponent } from './cb-core.component';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GlobalErrorHandler } from './global-error-handler';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [CbCoreComponent],
  imports: [
    AngularMaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule
  ],
  exports: [CbCoreComponent],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class CbCoreModule { }
