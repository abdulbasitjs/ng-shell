import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { User } from '@shared/models/user.model';
import { EP } from '@configs/endpoints';
import { StorageService } from '@core/services/storage.service';
import { StoragePrefix } from '@shared/models/storage-prefix.enum';
import { SSOResponse } from '@shared/models/http-response.model';
import { JwtHelperService } from '@core/services/jwt-helper.service';
import { map, Observable, pluck, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SSORoles } from '@shared/models/roles.model';
import { SSORolesMappingOfServer } from '@configs/ui.config';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnDestroy {
  _user$ = new BehaviorSubject<User | null>(null);
  _roles$ = new BehaviorSubject<Array<SSORoles>>([]);
  // _isRefreshingToken$ = new BehaviorSubject<Boolean>(false);
  public isRefreshingToken = false;

  userKey = `${StoragePrefix.SSO}user`;
  userSusbscription!: Subscription;

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private jwtHelperService: JwtHelperService,
    private router: Router
  ) {
    this.userSusbscription = this.storage.changes.subscribe((status) => {
      if (status.value === -1) {
        // Local storeage user key has been tempered, mark user unauthenticated.
        this.logout();
      }
    });
  }

  ngOnDestroy(): void {
    this.userSusbscription.unsubscribe();
  }

  getUserObservable() {
    return this._user$.asObservable();
  }
  // Login
  login(email: string, password: string, isRemeber: boolean) {
    this.http
      .post(EP.Login, { username: email, password, isRemeber })
      .subscribe((res) => {
        const response = <SSOResponse>res;
        const { code, data } = response;
        if (code === 200) {
          const { permissions, token, refreshToken } = data;
          this.storage.set(this.userKey, data);
          this._user$.next({ permissions, token, refreshToken });
          this.router.navigateByUrl('/');
        }
      });
  }

  // Forgot
  forgot(email: string) {
    return this.http.post(EP.Forgot, { email });
  }

  // Reset Password
  resetPassword(password: string, cPassword: string, token: string) {
    return this.http.post(EP.Reset, {
      password,
      passwordConfirmation: cPassword,
      token,
    });
  }

  // Logout
  logout() {
    if (this.getToken()) this.storage.remove(this.userKey);
    this._user$.next(null);
    this.router.navigateByUrl('/auth/login');
  }

  // Refresh Token API
  refreshToken() {
    return this.http.post(EP.RefreshToken, {
      token: this.getToken(),
      refreshToken: this.getRefreshToken(),
    });
  }

  // Get Roles
  getUserRolesAsync(): Observable<any> {
    return this.http.get(EP.Roles);
  }

  // Helper Methods
  isAuthenticated() {
    console.log('isAUthenticated');
    return (
      !this.isTokenExpired() && !!this.getToken() && !this.isRefreshingToken
    );
  }

  decodeToken() {
    return this.jwtHelperService.decodeToken(this.getToken());
  }

  getTokenExpirationDate() {
    return this.jwtHelperService.getTokenExpirationDate(this.getToken());
  }

  isTokenExpired() {
    return this.jwtHelperService.isTokenExpired(this.getToken());
  }

  getRefreshToken() {
    return this.storage.getRefreshToken();
  }

  getToken() {
    return this.storage.getToken();
  }

  getUser() {
    const {
      data: { name, email, password },
    } = this.decodeToken();
    return { name, email, password };
  }

  getRoles() {
    return this._roles$.asObservable();
  }

  getUserRoles(): SSORoles {
    const user = this.storage.get(this.userKey);
    if (user && user.permissions) {
      return user.permissions;
    }
    return {};
  }

  isRoleVerified(projectKey: string): boolean | Observable<boolean> {
    const role = this.getUserRoles();
    if (Object.keys(role).length) {
      return !!role[SSORolesMappingOfServer[projectKey]];
    } else {
      return this.getUserRolesAsync()
        .pipe(pluck('roles', 'data'))
        .pipe(map((el) => !!el[SSORolesMappingOfServer[projectKey]]));
    }
  }

  setNewToken(res: any) {
    const response = <SSOResponse>res;
    const { code, data } = response;
    if (code === 200) {
      const { permissions, token, refreshToken } = data;
      this.storage.set(this.userKey, data);
      this._user$.next({ permissions, token, refreshToken });
      return token;
    }
    return '';
  }
}
