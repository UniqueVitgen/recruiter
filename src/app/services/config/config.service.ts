import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
// import { Http, Response, RequestOptionsArgs, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { throwError } from 'rxjs/index';
import { catchError } from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static apiUrl = 'https://virtserver.swaggerhub.com/ksenya96/hr_api/1.0.0/';

  constructor(private http: HttpClient
    // ,private sessionService: SessionService
  ) {
  }

  createHeaders() {
    return new HttpHeaders();
  }

  post<T>(url, data) {
    let headers = this.createHeaders();
    return this.http.post<T>(ConfigService.apiUrl + url, data, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  get<T>(url) {
    let headers = this.createHeaders();
    return this.http.get<T>(ConfigService.apiUrl + url, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getResponse<T>(url) {
    return this.http.get<HttpResponse<T>>(ConfigService.apiUrl + url, { observe: 'response' });
  }

  put<T>(url, data) {
    let headers = this.createHeaders();
    return this.http.put<T>(ConfigService.apiUrl + url, data, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  delete<T>(url) {
    let headers = this.createHeaders();
    return this.http.delete<T>(ConfigService.apiUrl + url, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (!error.status || error.status !== 200) {
      if (error.error && error.error.message) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(`Backend returned code ${error.status}`, error);
      }
      return throwError(error);
    }
  };
}
