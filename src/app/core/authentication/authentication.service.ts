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

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnDestroy {
  _user$ = new BehaviorSubject<User | null>(null);
  _roles$ = new BehaviorSubject<Array<SSORoles>>([]);

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

  login(email: string, password: string, isRemeber: boolean) {
    console.log(isRemeber);
    if (email === 'admin@admin.com' && password === 'admin') {
      this.http.get(EP.Login).subscribe((res) => {
        const response = <SSOResponse>res;
        if (response && response.data) {
          const { data: user } = response;
          const {
            id,
            name,
            email,
            roles,
            permissions,
            access_token: token,
          } = user;
          this.storage.set(this.userKey, user);
          this._user$.next({ id, name, email, roles, permissions, token });
          this.router.navigateByUrl('/home');
        }
      });
    } else {
      alert('Inavalid Username password');
    }
  }

  forgot(email: string) {
    alert(email);
  }

  logout() {
    if (this.getToken()) this.storage.remove(this.userKey);
    this._user$.next(null);
    this.router.navigateByUrl('/login');
  }

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

  getToken() {
    return this.storage.getToken();
  }

  getUser() {
    return this.storage.get(this.userKey);
  }

  getRoles() {
    return this._roles$.asObservable();
  }

  getUserRolesAsync(): Observable<any> {
    return this.http.get(EP.Roles);
  }

  getUserRoles(): SSORoles {
    const user = this.storage.get(this.userKey);
    if (user && user.role) {
      return user.role;
    }
    return {};
  }

  isRoleVerified(projectKey: string): boolean | Observable<boolean> {
    const role = this.getUserRoles();
    if (Object.keys(role).length) {
      return !!role[projectKey];
    } else {
      return this.getUserRolesAsync()
        .pipe(pluck('roles', 'data'))
        .pipe(map((el) => !!el[projectKey]));
    }
  }
}
