import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { StorageService } from '@core/services/storage.service';
import { StoragePrefix } from '@core/models/storage-prefix.enum';
import { SSOResponse } from '@core/http/http-response.model';
import { JwtHelperService } from '@core/services/jwt-helper.service';
import { catchError, of, Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';
import { EP } from '@configs/index';

const USER_PROFILE_STORAGE_KEY = `${StoragePrefix.SSO}user-profile`;
@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnDestroy {
  _user$ = new BehaviorSubject<any>(null);
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
    return this.http
      .post(EP.Login, { username: email, password, rememberme: +isRemeber })
      .pipe(
        tap((res) => {
          const response = <SSOResponse>res;
          const { code, data } = response;
          if (code === 200) {
            this.storage.set(this.userKey, data);
            const { permissions, token, refreshToken } = data;
            this._user$.next({
              permissions,
              token,
              refreshToken,
            });

            this.router.navigateByUrl('/');
          }
        }),
        catchError((err) => {
          return of(err.error);
        })
      );
  }

  // Logout
  logout() {
    if (this.getToken()) this.storage.remove(this.userKey);
    this._user$.next(null);
    this.storage.remove(USER_PROFILE_STORAGE_KEY);
    this.router.navigateByUrl('/oti-provisioning/login');
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
