import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { NavigationService } from '@core/services/navigation.service';
import { RolesService } from '@core/services/roles.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private rolesService: RolesService,
    private navigationService: NavigationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (route && route.data && route.data['expectedRoles']) {
      const expectedRoles = route.data['expectedRoles'];
      if (this.rolesService.hasPermission(expectedRoles)) {
        return true;
      } else {
        this.navigationService.back();
        return false;
      }
    }
    return false;
  }
}
