import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RunRaffleComponent } from '../run-raffle/run-raffle.component';
import { SharedService } from '../../../shared/shared.service';
import { RaffleData } from '../../models/raffle-data';

@Component({
  selector: 'app-raffle-dashboard',
  templateUrl: './raffle-dashboard.component.html',
  styleUrls: ['./raffle-dashboard.component.css']
})
export class RaffleDashboardComponent implements OnInit {

  numberOfWinners: number;
  raffledata: any;
  constructor(public dialog: MatDialog,
    public sharedService: SharedService) { }
  ngOnInit() {
    this.raffledata = this.sharedService.raffleData;
    this.numberOfWinners = this.raffledata.promotion && this.raffledata.promotion.noOfWinners || 0;
  }

  currentDate() {
    return new Date();
  }


  runRaffle() {
    const dialogRef = this.dialog.open(RunRaffleComponent, { width: '100%', data: this.raffledata, disableClose: true });
  }

}
