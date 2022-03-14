import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raffle-initiation',
  templateUrl: './raffle-initiation.component.html',
  styleUrls: ['./raffle-initiation.component.css']
})
export class RaffleInitiationComponent implements OnInit {

  public now: Date = new Date();

  constructor() {
      setInterval(() => {
        this.now = new Date();
      }, 1);
  }


  
  ngOnInit() {
  }

}
