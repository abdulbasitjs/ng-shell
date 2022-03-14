import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authSerivce: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authSerivce.isAuthenticated()) {
      const ResetRoute = '/auth/reset?key=';
      const InviteRoute = '/auth/invite?key=';
      if (state.url.includes(ResetRoute) || state.url.includes(InviteRoute)) {
        this.authSerivce.logout();
        this.router.navigateByUrl(state.url);
        return true;
      }
      this.router.navigateByUrl('/home');
      return false;
    }
    return true;
  }
}
