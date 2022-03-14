import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular ChatBot';
  constructor(private http: HttpClient) { }


  throwError() {
    throw new Error('My Pretty Error');
  }

  throwHttpError() {
    this.http.get('urlhere').subscribe();
  }
}
