import { Injectable } from '@angular/core';
import { ServerInteractionService } from '../../nbk-core/http/server-interaction.service';

@Injectable({
  providedIn: 'root'
})
export class RaffleService {

  constructor(private http: ServerInteractionService) { }

  getRaffles(userId: any) {
    const queryParams = {
      id: userId
    };
    return this.http.get('raffle', null, '', queryParams, null);
  }

  saveRaffle(request: any) {
    return this.http.post('raffle', request, '', null, null);
  }

  updateRaffle(request: any) {
    return this.http.put('raffle', request, '', null, null);
  }



}
