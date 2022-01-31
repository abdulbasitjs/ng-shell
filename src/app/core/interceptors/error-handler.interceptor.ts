import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { HttpStatusCode } from '@shared/models/http-codes.enum';
import { LoggerService } from '@core/services/logger.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private logger: LoggerService,
    private toaster: ToastrService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(response: any): Observable<HttpEvent<any>> {
    LoggerService.error('Request Error: ' + JSON.stringify(response));
    this.toaster.error(response.message, response.statusText);
    switch (response['status']) {
      case HttpStatusCode.Unauthorized:
        this.router.navigateByUrl('/auth/login');
        break;

      case HttpStatusCode.Forbidden:
        this.router.navigateByUrl('/403');
        break;

      case HttpStatusCode.BadRequest:
        break;

      default:
        break;
    }
    throw response;
  }
}
