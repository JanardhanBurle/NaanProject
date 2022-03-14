import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { AppModule } from './app.module';

@NgModule({})
export class PaymentHubSharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AppModule,
            providers: []
        }
    }
}
