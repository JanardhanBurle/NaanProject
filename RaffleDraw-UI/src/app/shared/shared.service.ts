import { Injectable } from '@angular/core';
import { RaffleData } from '../raffle-home/models/raffle-data';
import { PromotionData } from '../raffle-home/models/promo-data';
import { UserContext } from './models/user-context';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() { }
  raffleWinner = new BehaviorSubject({});
  private _userContext: UserContext;
  private _raffleData: RaffleData;

  updateRaffleWinner(winner: any) {
    this.raffleWinner.next(winner);
  }

  getRaffleWinner() {
    return this.raffleWinner.asObservable();
  }

  get userContext(): UserContext {
    return this._userContext;
  }

  set userContext(data: UserContext) {
    if (data) {
      this._userContext = data;
    }
  }

  get raffleData(): RaffleData {
    return this._raffleData;
  }

  set raffleData(data: RaffleData) {
    if (data) {
      this._raffleData = data;
    }
  }

}