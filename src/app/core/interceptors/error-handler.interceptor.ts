import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { HttpStatusCode } from '@core/http/http-codes.enum';
import { LoggerService } from '@core/services/logger.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '@core/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private _: LoggerService,
    private toaster: ToastrService,
    private auth: AuthenticationService
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
    switch (response['status']) {
      case HttpStatusCode.BadRequest:
        if (!response.url.includes('users/create') && (!response.url.includes('resetpassword'))) {
          this.toaster.error(response.error.message, 'Error');
        }
        break;

      case HttpStatusCode.Unauthorized:
        if (response.url.includes('login'))
          this.toaster.error(response.error.message, 'Error');
        this.auth.logout();
        break;

      case HttpStatusCode.Forbidden:
        this.router.navigateByUrl('/403');
        break;

      case HttpStatusCode.InternalServerError:
        this.toaster.error(response.message, 'Error');
        break;

      default:
        this.toaster.error(response.message, 'Error');
        break;
    }
    throw response;
  }
}
