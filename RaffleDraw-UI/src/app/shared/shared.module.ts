import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './Layout/header/header.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { HomeComponent } from './Layout/home/home.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { ScreenfullDirective } from './directives/screenfull.directive';
import { HttpClient } from '@angular/common/http';
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatMenuModule, MatSnackBarModule, MatDialogModule, MatChipsModule, MatSlideToggleModule } from '@angular/material';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../assets/translations/', '.json');
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return 'Translation failed, Please use English by default';
  }
}

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SafeHtmlPipe,
    ScreenfullDirective
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true,
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler },
      useDefaultLang: true
    })
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SafeHtmlPipe,
    ScreenfullDirective,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule,
    MatSlideToggleModule,
    TranslateModule
  ]
})
export class SharedModule {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }
}
