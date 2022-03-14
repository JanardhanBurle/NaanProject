import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { WebSocketsService } from '../loopin-core/services/web-sockets.service';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sub: Subscription;

  constructor(private wsService: WebSocketsService,
    private rxStompService: RxStompService) { }

  ngOnInit() {

    this.wsService.login().subscribe((data) => {
      console.log(data);
    });
    this.initiateWebsocket();
  }

  initiateWebsocket() {
    this.rxStompService.watch('/user/restaraunts/live').subscribe((res: Message) => {
      console.log(res.body);
      const parsedRes = JSON.parse(res.body);
      switch (parsedRes.event) {
        case 'EMS': this.EMS(parsedRes.data);
          break;
        case 'EIA': this.EIA(parsedRes.data);
          break;
        case 'EIR': this.EIR(parsedRes.data);
          break;
        case 'EIE': this.EIE(parsedRes.data);
          break;
        case 'EME': this.EME(parsedRes.data);
          break;
        case 'ENF': this.ENF(parsedRes.data);
          break;
        case 'ENR': this.ENR(parsedRes.data);
          break;
        case 'EOR': this.EOR(parsedRes.data);
          break;
        case 'ENO': this.ENO(parsedRes.data);
          break;
        case 'ESO': this.ESO(parsedRes.data);
          break;
      }
    });
  }
  EMS(data) {
    console.log('EMS----->', data);
  }

  EIA(data) {
    console.log('EIA----->', data);
  }

  EIR(data) {
    console.log('EIR----->', data);
  }

  EIE(data) {
    console.log('EIE----->', data);
  }

  EME(data) {
    console.log('EME----->', data);
  }

  ENF(data) {
    console.log('ENF----->', data);
  }

  ENR(data) {
    console.log('ENR----->', data);
  }

  EOR(data) {
    console.log('EOR----->', data);
  }

  ENO(data) {
    console.log('ENO----->', data);
  }

  ESO(data) {
    console.log('ESO----->', data);
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
