import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { User } from './user.model';
import { StorageService } from '@core/services/storage.service';
import { StoragePrefix } from '@core/models/storage-prefix.enum';
import { SSOResponse } from '@core/http/http-response.model';
import { JwtHelperService } from '@core/services/jwt-helper.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { EP } from '@configs/index';
@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnDestroy {
  _user$ = new BehaviorSubject<User | null>(null);
  userKey = `${StoragePrefix.SSO}user`;
  userSusbscription!: Subscription;
  fakePermissions = {
    'oti-pp': { l: 'Admin', r: 'admin' },
    'oti-db': { l: 'Admin', r: 'sales' },
    'rtpd-pp': { l: 'Admin', r: 'admin' },
    'rtpd-db': { l: 'Admin', r: 'admin' },
  };

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
      .post(EP.Login, { username: email, password, rememberme: +isRemeber })
      .subscribe((res) => {
        const response = <SSOResponse>res;
        const { code, data } = response;
        if (code === 200) {
          const { permissions, token, refreshToken } = data;
          data.permissions = this.fakePermissions;
          this.storage.set(this.userKey, data);
          this._user$.next({
            permissions,
            token,
            refreshToken,
          });
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

  // Helper Methods
  isAuthenticated() {
    return !this.isTokenExpired() && !!this.getToken();
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
      data: { name = '', email = '', password = '' },
    } = this.decodeToken() || { data: {} };
    return { name, email, password };
  }

  getPermissions() {
    return this.storage.get(this.userKey).permissions
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
