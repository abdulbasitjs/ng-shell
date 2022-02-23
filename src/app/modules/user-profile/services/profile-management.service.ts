import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EP, SSORolesReverseMappingOfServer } from '@configs/index';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { SSOResponse } from '@core/http/http-response.model';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { IUserItem } from '../../user-management/user-management.model';
import { IModulesRolesResponse } from '../../user-management/models/modules-response.model';

type ChangePassword = {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
};

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private isUserDetailLoading$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private currentUser$: BehaviorSubject<IUserItem | null> =
    new BehaviorSubject<IUserItem | null>(null);

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private toasterService: ToastrService
  ) {}

  // Endpoints
  getMe() {
    this.isUserDetailLoading$.next(true);
    this.http.post(EP.Me, {}).subscribe((res) => {
      this.isUserDetailLoading$.next(false);
      const response = <SSOResponse>res;
      if (response.code == HttpStatusCode.Ok) {
        this.currentUser$.next(response.data);
      }
    });
  }

  updateProfile(name: string) {
    if (name === this.currentUser$.value?.name) {
      this.toasterService.warning(
        `You did't change the user name.`,
        'Username'
      );
      return of({ error: true });
    }
    return this.http.post(EP.UpdateProfile, { name }).pipe(
      tap((res) => {
        const response = <SSOResponse>res;
        if (response.code === HttpStatusCode.Ok) {
          this.currentUser$.next(response.data);
          // this.auth._user$.n
        }
        return res;
      })
    );
  }

  updatePassword(payload: ChangePassword) {
    return this.http.post(EP.UpdatePassword, payload).pipe(
      tap((res) => {
        const response = <SSOResponse>res;
        if (response.code === HttpStatusCode.Ok) {
          console.log(response);
          this.currentUser$.next(response.data);
        }
        return res;
      })
    );
  }

  // Observables
  getCurrentUserObservable() {
    return this.currentUser$.asObservable();
  }

  isUserLoadingObservable() {
    return this.isUserDetailLoading$.asObservable();
  }

  getModules(permissions: { [key: string]: IModulesRolesResponse }) {
    return Object.keys(permissions).map((el) => ({
      text: <string>SSORolesReverseMappingOfServer[el],
      label: <string>permissions[el].l,
      role: <string>permissions[el].r,
    }));
  }
}
