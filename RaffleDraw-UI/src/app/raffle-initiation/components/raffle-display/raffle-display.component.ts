import { Component, OnInit } from '@angular/core';
import { TweenMax, Power3 } from "gsap/TweenMax";
import { interval, Subscription } from 'rxjs';
import { startWith } from 'rxjs/internal/operators/startWith';
import { Input } from '@angular/core';
import { RaffleWinner } from '../../../raffle-home/models/raffle-winner';
import { MatTableDataSource } from '@angular/material';
import { Prize } from '../../../raffle-home/models/prize';
import { SharedService } from '../../../shared/shared.service';
import { RaffleData } from '../../../raffle-home/models/raffle-data';
declare const $: any;

@Component({
  selector: 'app-raffle-display',
  templateUrl: './raffle-display.component.html',
  styleUrls: ['./raffle-display.component.css']
})
export class RaffleDisplayComponent implements OnInit {
  raffleType: number;
  raffleData: RaffleData;
  currentWinner: RaffleWinner;
  prizes: Prize[];
  raffleWinners: any = [];
  raffleCustomersInfo: any[];
  raffleWinnersList: MatTableDataSource<any>;
  numberOfWinners = 0;
  subscriber: Subscription;
  delay = 0.03;
  raffleIsSelected = false;
  constructor(private sharedService: SharedService) {
  }
  ngOnInit() {
    this.raffleData = this.sharedService.raffleData;
    if (this.raffleData) {
      this.raffleCustomersInfo = this.raffleData.participants;
      this.prizes = this.raffleData.promotion.prizes;
      this.numberOfWinners = this.raffleData.promotion.noOfWinners;
      this.raffleType = this.raffleData.raffleType;
    }
  }


  startRaffle() {
    this.raffleIsSelected = false;
    if (this.raffleType === 1) {
      this.manualSelectRaffle();
    } else if (this.raffleType === 2) {
      this.semiAutoSelectRaffle();
    } else {
      this.autoSelectRaffle();
    }
  }

  manualSelectRaffle() {
    this.delay = 0.005;
    let number = ((Math.random() * 10000000)).toString();
    this.countDown('node00', 'node01', Number(number[0]));
    setTimeout(() => { this.countDown('node10', 'node11', Number(number[1])); }, (Math.random() * 1000));
    setTimeout(() => { this.countDown('node20', 'node21', Number(number[2])); }, (Math.random() * 1000));
    setTimeout(() => { this.countDown('node30', 'node31', Number(number[3])); }, (Math.random() * 1000));
    setTimeout(() => { this.countDown('node40', 'node41', Number(number[4])); }, (Math.random() * 1000));
    setTimeout(() => { this.countDown('node50', 'node51', Number(number[5])); }, (Math.random() * 1000));
    setTimeout(() => { this.countDown('node60', 'node61', Number(number[6])); }, (Math.random() * 1000));
    setTimeout(() => { this.countDown('node70', 'node71', Number(number[7])); }, (Math.random() * 1000));
    setTimeout(() => { this.countDown('node80', 'node81', Number(number[8])); }, (Math.random() * 1000));
    setTimeout(() => { this.countDown('node90', 'node91', Number(number[9])); }, (Math.random() * 1000));

  }

  autoSelectRaffle() {
    this.delay = 0.005;
    let inter = interval(3000);
    let count = 1;
    this.subscriber = inter.pipe(
      startWith(0)
    ).subscribe(response => {
      this.manualSelectRaffle();
      this.stopRaffle('auto');
      count += 1;
      if (count > this.numberOfWinners && this.subscriber) {
        this.subscriber.unsubscribe();
        this.delay = 0;
      }
    });
  }

  semiAutoSelectRaffle() {
    this.manualSelectRaffle();
    setTimeout(() => {
      this.stopRaffle('manual');
    }, 3000);
  }


  countDown(node0, node1, counter) {
    let _thisComponent = this;
    if (this.delay === 0) return;
    let n0 = document.querySelector('#' + node0);
    let n1 = document.querySelector('#' + node1);
    let nodeValue = '#' + node0 + ', #' + node1;
    if (counter > 0) {
      counter--;
    } else {
      counter = 9;
    }
    n1.textContent = counter;
    TweenMax.to(nodeValue, this.delay, {
      y: '+=400',
      delay: this.delay,
      ease: Power3.easeInOut,
      onComplete: function () {
        n0.textContent = counter;
        TweenMax.set(nodeValue, { y: '-=400', onComplete: _thisComponent.countDown(node0, node1, counter) });
      }
    });
  }



  stopRaffle(type: string) {
    if (type === 'manual') {
      this.delay = 0;
    }

    setTimeout(() => {
      const mirrorSelectedRaffle = $('#node00')[0].textContent + $('#node10')[0].textContent + $('#node20')[0].textContent;
      const selectedWinner = this.raffleCustomersInfo.find(customer => Number(customer.customerId) === Number(mirrorSelectedRaffle));
      const selectedRaffle = $('#node00')[0].textContent
        + $('#node10')[0].textContent
        + $('#node20')[0].textContent
        + $('#node30')[0].textContent
        + $('#node40')[0].textContent
        + $('#node50')[0].textContent
        + $('#node60')[0].textContent
        + $('#node70')[0].textContent
        + $('#node80')[0].textContent
        + $('#node90')[0].textContent;
      this.raffleIsSelected = true;
      if (selectedWinner) {
        let winner = new RaffleWinner();
        winner.id = this.raffleWinners ? this.raffleWinners.length + 1 : 1;
        winner.name = selectedWinner.customerName;
        winner.customerId = selectedWinner.customerId;
        winner.accountNumber = selectedWinner.accountNo;
        winner.raffleCode = selectedRaffle;
        winner.prize = this.prizes.length === 1 ? this.prizes[0].content : this.prizes[Number(winner.id) - 1].content;
        winner.prizeName = this.prizes.length === 1 ? this.prizes[0].name : this.prizes[Number(winner.id) - 1].name;
        this.currentWinner = winner;
        this.sharedService.updateRaffleWinner(winner);
        this.raffleWinners.push(winner);
        // this.openSnackBar('Winner ' + this.raffleWinners.length + ' selected');
      }
      this.sharedService.raffleData.winners = this.raffleWinners;
      // this.raffleWinnersList = new MatTableDataSource(this.raffleWinners);
    }, 200);
  }


  isAllWinnersSelected() {
    return this.raffleWinners.length === this.numberOfWinners ? true : false;
  }


}
