import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { LoaderService } from '@core/services/loader.service';
import { environment } from '@environment/environment';
import { catchError, finalize, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptor implements HttpInterceptor {
  constructor(
    private loader: LoaderService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  private isSvgRequest(request: HttpRequest<any>): boolean {
    if (
      request.headers.get('assets') &&
      request.headers.get('assets') === 'snx-local-svg'
    ) {
      return true;
    }
    return false;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const current = environment.endpoints.find(
      (endpoint) => endpoint.name === request.url
    );

    // if (!this.authService.isAuthenticated()) {
    //   this.router.navigateByUrl('/login');
    //   return next.handle(request);
    // }

    if (current?.hideLoader || this.isSvgRequest(request)) {
      return next.handle(request);
    }

    this.loader.setLoading(true, request.url);
    return next
      .handle(request)
      .pipe(finalize(() => this.loader.setLoading(false, request.url)));
  }
}
