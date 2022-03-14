import { Component, OnInit, Inject } from '@angular/core';
import { ChatPanelComponent } from './components/chat-panel/chat-panel.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  ngOnInit() { }

  openDialog() {
    this.dialog.open(ChatPanelComponent, {
      data: {
        id: 12345
      }, disableClose: true
    });
  }

}
