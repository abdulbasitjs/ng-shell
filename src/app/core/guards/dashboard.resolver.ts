import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SSORoles } from '@shared/models/roles.model';
import { AuthenticationService } from '@core/authentication/authentication.service';

type ResolveType = Observable<SSORoles> | Promise<SSORoles> | SSORoles;

@Injectable({
  providedIn: 'root',
})
export class DashboarResolverGuard implements Resolve<SSORoles> {
  constructor(private authService: AuthenticationService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ResolveType {
    return this.getDashboardRoles();
  }

  getDashboardRoles(): ResolveType {
    const userRoles = this.authService.getUserRoles();
    if (Object.keys(userRoles).length) {
      return this.authService.getUserRoles();
    } else {
      return this.authService.getUserRolesAsync();
    }
  }
}
