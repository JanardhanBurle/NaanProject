import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from 'protractor';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  // to get config files into application.
  getConfig(configUrl: string): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(configUrl, { observe: 'response' })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }


  getTextFile(filename: string) {
    // The Observable returned by get() is of type Observable<string>
    // because a text response was specified.
    // There's no need to pass a <string> type parameter to get().
    return this.http.get(filename, { responseType: 'text' })
      .pipe(
        tap( // Log the result or error
          data => this.log(filename, data),
          error => this.logError(filename, error)
        )
      );
  }

  /** POST: add data to the database */
  post(url: string, request: any): Observable<any> {
    return this.http.post<any>(url, request, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  /** GET heroes from the server */
  get(url: string): Observable<any> {
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }


  log(filename: string, data: any) {
    console.log(filename, data)
  }

  logError(filename: string, data: any) {
    console.error(filename, data)
  }

}
