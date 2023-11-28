import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, throwError, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  endPoint: string = environment.apiEndpoint;
  headers!: HttpHeaders;

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeoutValue = 100000;

    this.headers = new HttpHeaders({
      'Access-Control-Allow-Origin': this.endPoint,
      'Access-Control-Allow-Credentials': 'true',
    });

    const request = req.clone({
      headers: this.headers,
      withCredentials: true,
    });

    return next.handle(request).pipe(
      timeout(timeoutValue),
      catchError(err => {
        return throwError(() => new Error("An error on the request"));
      }));
  }
}
