import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AllRolesEnum,
  ProjectAccessControls,
  USER_MANAGEMENT_KEY,
} from '@configs/index';
import { RolesService } from './roles.service';

@Injectable({
  providedIn: 'root',
})
export class AccessControlService {
  constructor(private router: Router, private rolesService: RolesService) {}

  getProjectAccessControls() {
    const [, projectKey]: any = /\/([a-z].+)\//.exec(this.router.url);
    const roles: any = this.rolesService.getUserRolesFromStorage();

    if (projectKey === USER_MANAGEMENT_KEY) {
      const isSuperAdmin = Object.keys(roles).some(
        (el) => roles[el]['r'] === AllRolesEnum.SuperAdmin
      );

      const isAdmin = Object.keys(roles).some(
        (el) => roles[el]['r'] === AllRolesEnum.Admin
      );

      if (isSuperAdmin) return ProjectAccessControls[projectKey]['SuperAdmin'];
      if (isAdmin) return ProjectAccessControls[projectKey]['Admin'];
    }

    if (projectKey && Object.keys(roles).length) {
      const controls: any = ProjectAccessControls[projectKey];
      return controls[roles[projectKey]];
    }

    return {};
  }
}
