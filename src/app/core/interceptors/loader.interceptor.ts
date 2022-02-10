import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '@core/services/loader.service';
import { environment } from '@environment/environment';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptor implements HttpInterceptor {
  constructor(
    private loader: LoaderService,
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

    if (current?.hideLoader || this.isSvgRequest(request)) {
      return next.handle(request);
    }

    this.loader.setLoading(true, request.url);
    return next
      .handle(request)
      .pipe(finalize(() => this.loader.setLoading(false, request.url)));
  }
}
