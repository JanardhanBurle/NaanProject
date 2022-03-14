import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteAnimation } from '../../../nbk-core/animations/animations';
import { SharedService } from '../../../shared/shared.service';
import { UserContext } from '../../../shared/models/user-context';
import { RaffleService } from '../../../raffle-home/services/raffle.service';

@Component({
  selector: 'app-select-raffle',
  templateUrl: './select-raffle.component.html',
  styleUrls: ['./select-raffle.component.css'],
  animations: [RouteAnimation]
})
export class SelectRaffleComponent implements OnInit {
  userContext: UserContext;
  rafflesGroup: any[];
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private raffleService: RaffleService) { }

  ngOnInit() {
    this.userContext = this.sharedService.userContext;
    if (this.userContext) {
      this.getRaffleInfo();
    } else {
      this.router.navigate(['/login']);
    }
  }


  beginRaffle(raffleItem: any) {
    if (raffleItem.status === 'ACTIVE') {
      this.sharedService.raffleData = raffleItem.data;
      this.router.navigate(['/raffle-initiation/run-raffle']);
    } else return;
  }



  getRaffleInfo() {
    this.raffleService.getRaffles(this.userContext._id).subscribe(response => {
      const raffles = this.groupRaffles(response);
      const group = this.chunkArray(raffles, 6);
      for (let i = 0; i < group.length; i++) {
        group[i] = this.chunkArray(group[i], 2);
      }
      this.rafflesGroup = group;
      console.log(this.rafflesGroup);
    });
  }


  groupRaffles(raffles: any) {
    const groupedRafles = [];
    raffles.sort((a, b) => {
      return a.isCompleted - b.isCompleted;
    });
    raffles.forEach(raffle => {
      groupedRafles.push({
        raffleId: raffle.raffleRef,
        img: '../../../../assets/images/raffle-img.jpg',
        raffleName: raffle.raffleName,
        status: raffle.isCompleted ? 'COMPLETED' : 'ACTIVE',
        data: raffle
      });
    });
    return groupedRafles;
  }




  chunkArray(myArray, chunk_size) {
    let index = 0;
    let tempArray = [];
    for (index = 0; index < myArray.length; index += chunk_size) {
      tempArray.push(myArray.slice(index, index + chunk_size));
    }
    return tempArray;
  }
}
