import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AllRolesEnum,
  AllRolesReverseEnum,
  ProjectAccessControls,
  USER_MANAGEMENT_KEY,
} from '@configs/index';
import { RolesService } from './roles.service';
import {
  AllReverseRolls,
  SSORolesMappingOfServer,
} from '@configs/ui/roles/index';

@Injectable({
  providedIn: 'root',
})
export class AccessControlService {
  constructor(private router: Router, private rolesService: RolesService) {}

  getProjectAccessControls() {
    let [, projectKey]: any = /\/([a-z].+)\//.exec(this.router.url);
    const roles: any = this.rolesService.getUserRolesFromStorage();

    if (projectKey.includes(USER_MANAGEMENT_KEY)) {
      const isSuperAdmin = Object.keys(roles).some(
        (el) => roles[el]['r'] === AllRolesEnum.SuperAdmin
      );

      // const isAdmin = Object.keys(roles).some(
      //   (el) => roles[el]['r'] === AllRolesEnum.Admin
      // );

      if (isSuperAdmin)
        return ProjectAccessControls[USER_MANAGEMENT_KEY][
          AllRolesReverseEnum.superadmin
        ];
      // if (isAdmin)
      //   return ProjectAccessControls[USER_MANAGEMENT_KEY][
      //     AllRolesReverseEnum.admin
      //   ];
    }

    if (projectKey && Object.keys(roles).length) {
      if (projectKey.indexOf('/') > -1) {
        projectKey = projectKey.substr(0, projectKey.indexOf('/'));
      }

      const controls: any = ProjectAccessControls[projectKey];
      const r = roles[SSORolesMappingOfServer[projectKey]].r;
      return controls[AllReverseRolls[r]];
    }

    return {};
  }

  hasAccess(moduleType: string) {
    const currentAccessControls = this.getProjectAccessControls();

    if (currentAccessControls === '*') {
      return true;
    } else if (currentAccessControls === '!') {
      return false;
    } else if (
      currentAccessControls &&
      currentAccessControls.exclude_controls
    ) {
      const accessControls = currentAccessControls.exclude_controls;
      const excludedModule = accessControls.find(
        (access: any) => access.module_name === moduleType
      );
      if (excludedModule) {
        return false;
      } else {
        return true;
      }
    }

    return false;
  }
}
