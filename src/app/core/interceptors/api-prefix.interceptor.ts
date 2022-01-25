import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

export class ApiPrefixInterceptor implements HttpInterceptor {
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
    });

    return next.handle(req);
  }

  private _cleanUrl(url: string) {
    return url.substr(
      0,
      url.includes('?') ? url.indexOf('?') : url.length
    );
  }

  private _buildUrl(current: any, url: string): string {
    return `${
      environment[current?.baseUrl as keyof typeof undefined]['baseUrl']
    }${current?.api}${current?.path}${url}`;
  }
}
