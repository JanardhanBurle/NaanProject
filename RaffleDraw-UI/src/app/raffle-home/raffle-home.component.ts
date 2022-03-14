import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { UserContext } from '../shared/models/user-context';

@Component({
  selector: 'app-raffle-home',
  templateUrl: './raffle-home.component.html',
  styleUrls: ['./raffle-home.component.css']
})
export class RaffleHomeComponent implements OnInit {

  userInfo: UserContext;
  constructor(private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userInfo = this.sharedService.userContext;
    if (!this.userInfo) {
      this.logout();
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }


}
