import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SSORoles, SSORolesMappingOfServer } from '@configs/index';
import { RolesService } from '@core/services/roles.service';
import { deafultDashboardCards } from '@shared/components/app-dashboard-cards/values/dashboard.values';

type ResolveType = Observable<SSORoles> | Promise<SSORoles> | SSORoles;

@Injectable({
  providedIn: 'root',
})
export class DashboarResolverGuard implements Resolve<SSORoles> {
  defaultItems = deafultDashboardCards;
  constructor(private rolesService: RolesService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ResolveType {
    return this.getDashboardRoles();
  }

  getDashboardRoles(): ResolveType {
    const userRoles = this.rolesService.getUserRolesFromStorage();
    const len = Object.keys(userRoles).length;
    if (len) {
      // FIXME:
      // Proper Solution, but hiding it for now because currenlty
      // This feature is not required.
      // if (len === 1) {
      //   const list = this.rolesService.getUserRolesFromStorage();
      //   this.defaultItems = this.defaultItems.filter(
      //     (item) => !!list[SSORolesMappingOfServer[item.route]]
      //   );
      //   const route = this.defaultItems[0].route;
      //   this.router.navigateByUrl(`/${route}`);
      // }
      this.router.navigateByUrl('/oti-provisioning');
      return this.rolesService.getUserRolesFromStorage();
    } else {
      return this.rolesService.getUserRolesAsync();
    }
  }
}
