import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { User } from '@core/authentication/user.model';
import { StorageService } from '@core/services/storage.service';
import { StoragePrefix } from '@core/models/storage-prefix.enum';
import { map, Observable, of, pluck } from 'rxjs';
import { SSORolesMappingOfServer, SSORoles, EP } from '@configs/index';
@Injectable({ providedIn: 'root' })
export class RolesService {
  _roles$ = new BehaviorSubject<User | null>(null);
  userKey = `${StoragePrefix.SSO}user`;

  constructor(private http: HttpClient, private storage: StorageService) {}

  // Get Roles
  getUserRolesAsync(): Observable<any> {
    return this.http.get(EP.Roles);
  }

  getRolesObservable() {
    return this._roles$.asObservable();
  }

  getUserRolesFromStorage(): SSORoles {
    const user = this.storage.get(this.userKey);
    if (user && user.permissions) {
      return user.permissions;
    }
    return {};
  }

  isModuleVerified(projectKey: string): boolean | Observable<boolean> {
    const role = this.getUserRolesFromStorage();
    if (Object.keys(role).length) {
      return !!role[SSORolesMappingOfServer[projectKey]];
    } else {
      return of(true);
      // return this.getUserRolesAsync()
      //   .pipe(pluck('roles', 'data'))
      //   .pipe(map((el) => !!el[SSORolesMappingOfServer[projectKey]]));
    }
  }

  hasPermission(expectedRoles: Array<string>) {
    const roles: any = this.getUserRolesFromStorage();
    return Object.keys(roles).some((el) =>
      expectedRoles.includes(roles[el]['r'])
    );
  }
}
