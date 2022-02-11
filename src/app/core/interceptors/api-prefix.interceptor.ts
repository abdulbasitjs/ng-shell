import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '@core/authentication/authentication.service';

import { environment } from '@environment/environment';
import { SSOResponse } from '@shared/models/http-response.model';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiPrefixInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private auth: AuthenticationService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.headers.get('assets') &&
      req.headers.get('assets') === 'snx-local-svg'
    ) {
      return next.handle(req);
    }

    const current = environment.endpoints.find(
      (endpoint) => endpoint.name === this._cleanUrl(req.url)
    );

    req = req.clone({
      url: this._buildUrl(current, req.url),
      setHeaders: current?.noToken
        ? {}
        : {
            Authorization: `Bearer ${this.auth.getToken()}`,
          },
    });

    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('login') &&
          error.status === HttpStatusCode.Unauthorized
        ) {
          return this.handleUnauthorized(req, next);
        }
        return throwError(error);
      })
    );
  }

  private _cleanUrl(url: string) {
    return url.substr(0, url.includes('?') ? url.indexOf('?') : url.length);
  }

  private _buildUrl(current: any, url: string): string {
    if (current) {
      return `${
        environment[current?.baseUrl as keyof typeof undefined]['baseUrl']
      }${current?.api}${current?.path}${url}`;
    }

    return '';
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handleUnauthorized(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.auth.isRefreshingToken = true;
      this.refreshTokenSubject.next(null);
      const token = this.auth.getRefreshToken();
      if (token)
        return this.auth.refreshToken().pipe(
          switchMap((res) => {
            const newToken = this.auth.setNewToken(res);
            this.isRefreshing = false;
            this.auth.isRefreshingToken = false;
            this.refreshTokenSubject.next(newToken);
            return next.handle(this.addTokenHeader(request, newToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.auth.logout();
            return throwError(err);
          })
        );
    }
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }
}
