import { Injectable } from '@angular/core';
import { ServerInteractionService } from '../../nbk-core/http/server-interaction.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: ServerInteractionService) { }

  getPromotions() {
    return this.http.get('promotion', null, '', null, null);
  }

  savePromotion(request: any) {
    return this.http.post('promotion', request, '', null, null);
  }

  updatePromotion(request: any) {
    return this.http.put('promotion', request, '', null, null);
  }

  getPromotionTypes() {
    return this.http.get('getPromotionTypes', null, '', null, null);
  }


}
