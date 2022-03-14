import { Injectable } from '@angular/core';
import { ServerInteractionService } from '../../nbk-core/http/server-interaction.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: ServerInteractionService) { }

  validateUserLogin(request: any) {
    return this.http.post('validateUserLogin', request, '', null, null);
  }

  resetPassword(request: any) {
    return this.http.put('validateUserLogin', request, '', null, null);
  }


}
