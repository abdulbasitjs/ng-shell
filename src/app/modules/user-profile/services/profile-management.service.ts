import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EP, SSORolesReverseMappingOfServer } from '@configs/index';
import { SSOResponse } from '@core/http/http-response.model';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { IUserItem, UserProfile } from '../../user-management/user-management.model';
import { IModulesRolesResponse } from '../../user-management/models/modules-response.model';
import { StorageService } from '@core/services/storage.service';
import { StoragePrefix } from '@core/models/storage-prefix.enum';

type ChangePassword = {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
};
const USER_PROFILE_STORAGE_KEY = `${StoragePrefix.SSO}user-profile`;
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private isUserDetailLoading$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private currentUser$: BehaviorSubject<IUserItem | null> =
    new BehaviorSubject<IUserItem | null>(null);
  // private userProfile$: BehaviorSubject<UserProfile | null> =
  //   new BehaviorSubject<UserProfile | null>(null);

  constructor(
    private http: HttpClient,
    private toasterService: ToastrService,
    private storageService: StorageService
  ) {}

  // Endpoints
  getMe() {
    this.isUserDetailLoading$.next(true);
    return this.http.post(EP.Me, {}).pipe(
      tap((res) => {
        this.isUserDetailLoading$.next(false);
        const response = <SSOResponse>res;
        if (response.code == HttpStatusCode.Ok) {
          this.currentUser$.next(response.data);
          this.storageService.set(USER_PROFILE_STORAGE_KEY, response.data);
        }
      })
    );
  }

  getUserProfileObservable() {
    return this.currentUser$.asObservable();
  }

  getUserProfile() {
    const userProfile = this.storageService.get(USER_PROFILE_STORAGE_KEY);
    if (userProfile && userProfile.name) {
      this.currentUser$.next(userProfile);
    }
    else {
      this.getMe().subscribe((d: any) => {
        this.currentUser$.next(d);
      })
    }
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
          this.storageService.set(USER_PROFILE_STORAGE_KEY, response.data);
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
