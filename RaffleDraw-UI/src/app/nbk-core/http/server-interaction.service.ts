import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class ServerInteractionService {
    constructor(
        private configService: ConfigService,
        private httpService: HttpService
    ) { }

    setTimeOut(): any { }


    get<T>(
        operation: string,
        params: HttpParams = null,
        pathVariables: number | string | object = null,
        queryParams: object = null,
        headers: HttpHeaders | null): Observable<HttpResponse<any>> {
        this.setTimeOut();
        return this.httpService.get(
            this.prepareUrl(operation, pathVariables, queryParams),
            { params: params, headers: this.prepareHeader(headers) }
        );
    }


    post<T>(
        operation: string,
        body: any,
        pathVariables: number | string | object = null,
        queryParams: object = null,
        headers: HttpHeaders | null): Observable<HttpResponse<any>> {
        this.setTimeOut();
        return this.httpService.post(this.prepareUrl(operation, pathVariables, queryParams), body, { headers: this.prepareHeader(headers) }
        );
    }


    put<T>(
        operation: string,
        body: any,
        pathVariables: number | string | object = null,
        queryParams: object = null,
        headers: HttpHeaders | null): Observable<HttpResponse<any>> {
        this.setTimeOut();
        return this.httpService.put(this.prepareUrl(operation, pathVariables, queryParams), body, { headers: this.prepareHeader(headers) }
        );
    }


    delete<T>(
        operation: string,
        params: HttpParams = null,
        pathVariables: number | string | object = null,
        queryParams: object = null,
        headers: HttpHeaders | null): Observable<HttpResponse<any>> {
        this.setTimeOut();
        return this.httpService.delete(
            this.prepareUrl(operation, pathVariables, queryParams),
            { params: params, headers: this.prepareHeader(headers) }
        );
    }

    private prepareUrl(operationName: any, pathVariables: number | string | object = null, queryParams: object = null) {
        const operationInfo = this.configService.getOperation(operationName);
        const baseUrl = this.configService.get(`api->${operationInfo.baseUrl}`);

        const modifiedURL = null ? `${baseUrl}${operationInfo.path}` :
            this.resolvePathVariables(`${baseUrl}${operationInfo.path}`, pathVariables);

        return queryParams === null ? modifiedURL : modifiedURL + '/' + this.queryStringBuilder(queryParams);
    }

    private prepareHeader(headers: HttpHeaders | null): any {
        if (headers) {
            return headers;
        }

        let _headers: HttpHeaders = new HttpHeaders();
        _headers = _headers
            .set('Content-Type', 'application/json')
            .set('requestId', 'UUID.UUID()')
    }

    private resolvePathVariables(url: string, pathVariables: number | string | object = null): any {
        if (typeof pathVariables === 'number' || typeof pathVariables === 'string') {
            url = `${url}/${pathVariables}`;
        } else if (typeof pathVariables === 'object') {
            const keys = Object.keys(pathVariables);
            keys.forEach(key => {
                const reg = new RegExp(`{${key}}`, 'g');
                url = url.replace(reg, pathVariables[key])
            });
        }
        return url;
    }

    private queryStringBuilder(params: any) {
        if (typeof params === 'undefined') {
            return '';
        }
        let query = '';
        let index = 0;
        for (let queryParam in params) {
            query = query + '?' + queryParam + '=' + params[queryParam]
        }
        return query
    }

}
