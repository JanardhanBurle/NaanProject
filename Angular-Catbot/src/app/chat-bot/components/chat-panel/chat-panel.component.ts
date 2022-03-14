import { Component, OnInit, Inject, Input, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '../../../../../projects/cb-core/node_modules/@angular/animations';
import { ChatBotService } from '../../chat-bot.service';
import { Observable } from 'rxjs';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.css']
})
export class ChatPanelComponent implements OnInit {
  @ViewChild('scrollMe', { read: true, static: false }) private myScrollContainer: ElementRef;
  @ViewChild('chatPanel', { read: true, static: false }) private chatPanel: ElementRef
  formValue: string;

  private message: Message;
  private messages: Message[] = [];
  constructor(
    public chat: ChatBotService,
    public dialogRef: MatDialogRef<ChatPanelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public chatBotService: ChatBotService,
  ) { }

  ngOnInit() {
    this.message = new Message('', './assets/images/user.png', 'USER');
    this.sendMessageToBot('Welcome-GBK');
    this.chatBotService.message.subscribe(data => {
      if (data.type === 'CHATBOT') {
        this.sendMessageToBot(data.message);
      } else {
        this.addMessage(data.message);
      }
    });
  }

  public sendMessage(): void {
    this.message.timestamp = new Date();
    this.addMessage(this.message);
    this.sendMessageToBot(this.message.content);
    this.message = new Message('', './assets/images/user.png', 'USER');
  }

  addMessage(message: any) {
    this.messages.push(message);
    this.scrollToBottom();
  }

  public sendMessageToBot(message: any) {
    this.chat.getResponse(message).subscribe(res => {
      res.result.fulfillment.messages.forEach((item, index) => {
        if (item.speech) {
          let logo = index === 0 ? './assets/images/gbk-chat-bot.png' : null;
          this.messages.push(
            new Message(item.speech, logo, 'CHATBOT', res.timestamp));
        }
        if (item.payload) {
          this.messages[this.messages.length - 1].suggestions = item.payload.suggestions;
          this.messages[this.messages.length - 1].upload_document = item.payload.upload_document;
          this.messages[this.messages.length - 1].datepicker = item.payload.datepicker;
          this.messages[this.messages.length - 1].googleMap = item.payload.googleMap;
        }
      });
    });
    console.log(this.messages);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }


  scrollToBottom(): void {
    let objDiv = document.getElementById("messageContainer");
    objDiv.scrollTop = objDiv.scrollHeight;
  }


  handleClickEvent(message: any) {
    this.message = new Message(message.title, './assets/images/user.png', 'USER');
    this.addMessage(this.message);
    this.sendMessageToBot(message.title);
    this.message = new Message('', './assets/images/user.png', 'USER');
    console.log(message);
  }

 
}
