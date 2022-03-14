import { Component, OnInit, Input, Output, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Message } from '../../models/message.model';
import { EventEmitter } from '@angular/core';
import { ChatBotService } from '../../chat-bot.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input('message') private message: Message;
  @Output() clickEvent = new EventEmitter();
  locationSelectEvent
  constructor(
    public chatBotService: ChatBotService,
    public sanitizer: DomSanitizer
  ) { }


  ngOnInit() { }

  onClickSuggestion(message) {
    this.clickEvent.emit(message);
  }

  orgValueChange(date) {
    let message = {
      title: new Date(date._validSelected).toDateString()
    };
    this.clickEvent.emit(message);
  }

  pushMessage(message: any) {
    this.chatBotService.pushMessage(message);
  }

  selectAddress(data: any) {
    let message = {
      title: data
    };
    this.clickEvent.emit(message);
  }


  fileChangeListener(input: any, fileInput: any) {
    if (input.files[0].type !== 'image/png' && input.files[0].type !== 'image/jpeg') {
      this.pushMessage({
        type: 'CHATBOT',
        message: 'invalid-File-type'
      });
      return;
    }

    const files = input.files;
    const file: File = input.files[0];
    if (files && file) {
      const fileReader: FileReader = new FileReader();

      var myReader: FileReader = new FileReader();

      myReader.onloadend = (e) => {
        const binaryString = myReader.result;
        let message = new Message(null, './assets/images/user.png', 'USER');
        message.uploadedImg = {
          name: file.name,
          content: binaryString
        };
        this.pushMessage({
          type: 'USER',
          message: message
        });
        this.postResultToServer();
      }
      myReader.readAsDataURL(file);
    }
  }

  postResultToServer() {
    this.pushMessage({
      type: 'CHATBOT',
      message: 'valid-File-type'
    });
  }



  getSafeImageUrl(url: string) {
    if (url) {
      return this.sanitizer.bypassSecurityTrustUrl(url);
    } else
      return '../assets/images/prize-placeholder.png';
  }
}
