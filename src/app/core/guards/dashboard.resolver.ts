import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SSORoles } from '@configs/index';
import { RolesService } from '@core/services/roles.service';

type ResolveType = Observable<SSORoles> | Promise<SSORoles> | SSORoles;

@Injectable({
  providedIn: 'root',
})
export class DashboarResolverGuard implements Resolve<SSORoles> {
  constructor(private rolesService: RolesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ResolveType {
    return this.getDashboardRoles();
  }

  getDashboardRoles(): ResolveType {
    const userRoles = this.rolesService.getUserRolesFromStorage();
    if (Object.keys(userRoles).length) {
      return this.rolesService.getUserRolesFromStorage();
    } else {
      return this.rolesService.getUserRolesAsync();
    }
  }
}
