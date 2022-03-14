import { Injectable } from '@angular/core';
import { Socket } from '../helpers/socket';
import { Observable, Observer } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { HttpClient } from '@angular/common/http';


declare var io: {
  connect(url: string): Socket;
};

@Injectable({
  providedIn: 'root'
})
export class WebSocketsService {
  private loginUrl: string;
  private restaurantUrl: string;
  constructor(public _httpClient: HttpClient) {
    this.loginUrl = 'http://104.251.211.184:8080/fudnowapi/api/vendor/login/TV';
    this.restaurantUrl = 'http://104.251.211.184:8080/fudnowapi/api/restaraunt/1/TV';
  }

  login() {
    const payload = {
      // tslint:disable-next-line:max-line-length
      'mPIN': 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db'
    };

    return this._httpClient.post(this.loginUrl, payload);
  }

  restaurantData(restaurantID) {
    return this._httpClient.get(this.restaurantUrl);
  }

  private handleError(error) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      let errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Socket.io server error');
  }

}