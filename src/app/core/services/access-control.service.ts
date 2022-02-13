import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { ProjectAccessControls } from '@configs/index';

@Injectable({
  providedIn: 'root',
})
export class AccessControlService {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  getProjectAccessControls() {
    const [, projectKey]: any = /\/([a-z].+)\//.exec(this.router.url);
    const roles = this.authService.getUserRoles();
    if (projectKey && Object.keys(roles).length) {
      return ProjectAccessControls[projectKey][roles[projectKey]];
    }
    return {};
  }
}
