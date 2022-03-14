import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { retry } from 'rxjs/internal/operators/retry';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ConfigService {
    operations: any;
    config: any;
    constructor(private http: HttpClient) { }
    loadConfig() {
        return new Promise((resolve, reject) => {
            return this.http.get<any>(`./assets/configs/app.config.${environment.env}.json`)
                .pipe(
                    retry(3), // retry a failed request up to 3 times
                    catchError(this.handleError) // then handle the error
                ).subscribe(res => {
                    this.config = res;
                    console.log('config--->', res);
                    this.http.get<any>(`./assets/configs/operations.provider.json`).pipe(
                        retry(3),
                        catchError(this.handleError) // then handle the error
                    ).subscribe(response => {
                        console.log(response);
                        this.operations = response;
                        resolve(true);
                    }, (error) => {
                        reject(error);
                    });
                }, (error) => {
                    reject(error);
                });
        });
    }

    getOperation(key: any) {
        return this.operations[key];
    }

    get(key: any) {
        let value = null;
        if (key.match(/->/)) {
            const keys: string[] = key.split('->');
            Object.keys(keys).forEach((i) => {
                value = value == null ? this.config[keys[i]] : value[keys[i]];
            });
        } else {
            value = this.config[key];
        }
        return value;
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
