import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AllRolesEnum,
  AllRolesReverseEnum,
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

    if (projectKey.includes(USER_MANAGEMENT_KEY)) {
      const isSuperAdmin = Object.keys(roles).some(
        (el) => roles[el]['r'] === AllRolesEnum.SuperAdmin
      );

      const isAdmin = Object.keys(roles).some(
        (el) => roles[el]['r'] === AllRolesEnum.Admin
      );

      if (isSuperAdmin)
        return ProjectAccessControls[USER_MANAGEMENT_KEY][
          AllRolesReverseEnum.superadmin
        ];
      if (isAdmin)
        return ProjectAccessControls[USER_MANAGEMENT_KEY][
          AllRolesReverseEnum.admin
        ];
    }

    if (projectKey && Object.keys(roles).length) {
      const controls: any = ProjectAccessControls[projectKey];
      return controls[roles[projectKey]];
    }

    return {};
  }
}
