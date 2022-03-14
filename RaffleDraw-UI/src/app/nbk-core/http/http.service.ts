import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';

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

  get(url: any, options: any): Observable<HttpResponse<any>> {
    return this.http.get<any>(url, { params: options.params, headers: options.headers })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }


  post(url: string, request: any, options: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(url, request, { params: options.params, headers: options.headers })
      .pipe(
        catchError(this.handleError)
      );
  }


  put(url: string, request: any, options: any): Observable<HttpResponse<any>> {
    return this.http.put<any>(url, request, { params: options.params, headers: options.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(url: any, options: any): Observable<HttpResponse<any>> {
    return this.http.delete<any>(url, { params: options.params, headers: options.headers })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
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
  };

}
