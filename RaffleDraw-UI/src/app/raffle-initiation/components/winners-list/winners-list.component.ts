import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
declare var $: any;
@Component({
  selector: 'app-winners-list',
  templateUrl: './winners-list.component.html',
  styleUrls: ['./winners-list.component.css']
})
export class WinnersListComponent implements OnInit, OnDestroy {
  winnerList: any[];
  scrollToTop = false;
  subscription: Subscription;
  constructor(private router: Router,
    private sharedService: SharedService) { }

  ngOnInit() {
    if (this.sharedService && this.sharedService.raffleData) {
      this.winnerList = this.sharedService.raffleData.winners;;
      if (this.winnerList.length > 4) {
        this.scrollerTop(this.winnerList.length);
        const source = interval(this.winnerList.length * 1000);
        this.subscription = source.subscribe(val => {
          if (this.scrollToTop) {
            this.scrollerTop(this.winnerList.length);
          } else {
            this.scrollerBottom(this.winnerList.length);
          }
        });
      }
    }
  }


  scrollerTop(length: number) {
    $('#winnersList').animate({
      scrollTop: $('#winnersList').get(0).scrollHeight
    }, length * 1000);
    this.scrollToTop = false;
  }

  scrollerBottom(length: number) {
    $('#winnersList').animate({
      scrollTop: 0
    }, length * 1000);
    this.scrollToTop = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

}
