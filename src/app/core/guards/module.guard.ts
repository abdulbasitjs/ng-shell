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
export class ModuleGuard implements CanActivate {
  constructor(
    private rolesService: RolesService,
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
      route.data['module'] &&
      route.data['module']['key']
    ) {
      key = route.data['module']['key'];
      const isVerified = this.rolesService.isModuleVerified(key);
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
