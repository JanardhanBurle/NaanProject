import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-begin-raffle',
  templateUrl: './begin-raffle.component.html',
  styleUrls: ['./begin-raffle.component.css']
})
export class BeginRaffleComponent implements OnInit {
  raffleWinner: {};

  constructor(
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.subscribeToRaffleWinner();
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  subscribeToRaffleWinner() {
    this.sharedService.getRaffleWinner().subscribe(response => {
      this.raffleWinner = response;
    });
  }

}
