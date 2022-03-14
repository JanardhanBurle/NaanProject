import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBotComponent } from './chat-bot.component';
import { CbCoreModule } from 'projects/cb-core/src/public-api';
import { ChatPanelComponent } from './components/chat-panel/chat-panel.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChatbotButtonComponent } from './components/chatbot-button/chatbot-button.component';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';

@NgModule({
  declarations: [ChatBotComponent, ChatPanelComponent, ChatMessageComponent, ChatbotButtonComponent, GoogleMapsComponent, PersonalDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAKAzL_oFqiAxRHJoTvzP-ikirnicJSU3A',
      libraries: ['places']
    })
  ],
  exports: [ChatBotComponent],
  entryComponents: [ChatPanelComponent]
})
export class ChatBotModule { }
