import { Injectable } from '@angular/core';
import { ServerInteractionService } from '../../nbk-core/http/server-interaction.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: ServerInteractionService) { }

  getUsers() {
    return this.http.get('user', null, '', null, null);
  }

  createUser(request: any) {
    return this.http.post('user', request, '', null, null);
  }


  updateUser(request: any) {
    return this.http.put('user', request, '', null, null);
  }

  removeUsers(request: any) {
    const queryParams = {
      userId: request
    };
    return this.http.delete('user', null, '', queryParams, null);
  }
}
