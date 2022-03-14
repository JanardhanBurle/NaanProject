import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { UserContext } from '../../models/user-context';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) { }
  userInfo: UserContext;
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