import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  settingDropdownList,
  IDropdown,
  SettingDropdownEnum,
  USER_MANAGEMENT_KEY,
  USER_PROFILE_KEY,
  USER_MANAMGEMENT_EXPECTED_ROLES,
} from '@configs/index';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { RolesService } from '@core/services/roles.service';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/modules/user-profile/services/profile-management.service';
import { HeaderService, Module } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  header!: Module;
  private exptectedRoles = USER_MANAMGEMENT_EXPECTED_ROLES;

  headerSubscription!: Subscription;

  settingList: Array<IDropdown> = settingDropdownList;
  user: { name: string, email: string } = { name: '', email: '' };

  constructor(
    public headerService: HeaderService,
    public authService: AuthenticationService,
    public rolesService: RolesService,
    private router: Router,
    public pmService: ProfileService
  ) {}

  ngOnInit(): void {
    this.headerSubscription = this.headerService
      .getCurrentModule()
      .subscribe((module) => {
        if (module) {
          this.header = {
            title: module.title,
            desc: module.desc,
            hideIcon: !!module.hideIcon,
            hideHeaderMenu: !!module.hideHeaderMenu,
          };
        }
      });

      if (!this.rolesService.hasPermission(this.exptectedRoles)) {
        this.settingList = this.settingList.filter(el => el.value !== USER_MANAGEMENT_KEY)
      }

      this.pmService.getUserProfile();
  }

  ngOnDestroy(): void {
    this.headerSubscription.unsubscribe();
  }

  onSettingItemSelect(current: IDropdown) {
    // this.selectDropdownOption(current);
    if (current) {
      if (current.value === SettingDropdownEnum.Profile) {
        this.router.navigateByUrl(`/${USER_PROFILE_KEY}`);
      } else if (current.value === SettingDropdownEnum.UserManagement) {
        // this.router.navigateByUrl(`/${USER_MANAGEMENT_KEY}`);
        window.open('/user-management', "_blank");
      } else if (current.value === SettingDropdownEnum.Logout) {
        this.authService.logout();
      }
    }
  }

  selectDropdownOption(current: IDropdown) {
    this.settingList = this.settingList.map((el) => {
      if (el.value === current.value) {
        return { ...el, active: true };
      }
      return { ...el, active: false };
    });
  }

  getUserRole(user: any) {
    const role = user && user.permission && user.permission['oti-pp'] && user.permission['oti-pp']['l'];
    return role;
  } 
}
