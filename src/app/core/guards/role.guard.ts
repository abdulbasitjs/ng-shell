import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { NavigationService } from '@core/services/navigation.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private navigationService: NavigationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let key = '';
    if (
      route &&
      route.data &&
      route.data['project'] &&
      route.data['project']['key']
    ) {
      key = route.data['project']['key'];
      const isVerified = this.authService.isRoleVerified(key);
      if (!isVerified) {
        this.navigationService.back();
        return false;
      } else {
        return true;
      }
    }
    return false;
  }
}
