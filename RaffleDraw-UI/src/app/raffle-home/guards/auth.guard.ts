import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { UserContext } from '../../shared/models/user-context';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  userInfo: UserContext;
  constructor(private routes: Router,
    private sharedService: SharedService) {
    this.userInfo = this.sharedService.userContext;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userInfo) {
      this.routes.navigate(['/login']);
      return false;
    }
    if (this.userInfo.role !== 'ADMIN') {
      this.routes.navigate(['/raffle-home/dashboard']);
      return false;
    }
    else {
      return true;
    }

  }
}