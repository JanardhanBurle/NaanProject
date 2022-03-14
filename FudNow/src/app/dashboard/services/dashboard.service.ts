import { HttpService } from './../../loopin-core/services/http.service';
import { Injectable } from '@angular/core';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpService: HttpService) { }

  getMenuItems() {
    const url = 'http://104.251.211.184:8080/fudnowapi/api/restaraunt/1/TV';
    return this.httpService.get(url);
  }

}
