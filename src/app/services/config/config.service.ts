import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
// import { Http, Response, RequestOptionsArgs, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import {observable, Observable, throwError} from 'rxjs/index';
import {catchError, map} from 'rxjs/internal/operators';
import {ServiceData} from '../../enums/service-data.enum';
import {Http} from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  // static apiUrl = 'https://virtserver.swaggerhub.com/ksenya96/hr_api/1.0.0/';
  static apiUrl = 'http://localhost:8081/';
  static serviceData: ServiceData = ServiceData.Mock;

  constructor(private http: HttpClient
    // ,private sessionService: SessionService
  ) {
  }

  createHeaders() {
    // const headers = new HttpHeaders();
    let headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
      // 'Accept': 'application/json',
      // 'Access-Control-Allow-Origin': '*'
    });
    // headers = headers.append('Access-Control-Allow-Origin', '*');
    // headers = headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // // headers = headers.append('Access-Control-Allow-Methods', 'X-Requested-With');
    // headers = headers.append('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization');
    return headers;
  }

  post<T>(url, data) {
    const headers = this.createHeaders();
    return this.http.post<T>(ConfigService.apiUrl + url, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  get<T>(url) {
    const headers = this.createHeaders();
    return this.http.get<T>(ConfigService.apiUrl + url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getResponse<T>(url) {
    return this.http.get<T>(ConfigService.apiUrl + url);
  }

  put<T>(url, data) {
    const headers = this.createHeaders();
    return this.http.put<T>(ConfigService.apiUrl + url, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete<T>(url) {
    const headers = this.createHeaders();
    return this.http.delete<T>(ConfigService.apiUrl + url)
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
  }
  createObservable(object: any): Observable<any> {
    return Observable.create(observableObject => {
      observableObject.next(object);
    });
  }
}
