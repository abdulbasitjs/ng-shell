import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  settingDropdownList,
  IDropdown,
  SettingDropdownEnum,
} from '@configs/index';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { RolesService } from '@core/services/roles.service';
import { Subscription } from 'rxjs';
import { HeaderService, Module } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  header!: Module;

  headerSubscription!: Subscription;

  settingList: Array<any> = settingDropdownList;

  constructor(
    public headerService: HeaderService,
    public authService: AuthenticationService,
    public rolesService: RolesService,
    private router: Router
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
  }

  ngOnDestroy(): void {
    this.headerSubscription.unsubscribe();
  }

  onSettingItemSelect(current: IDropdown) {
    this.selectDropdownOption(current);
    if (current) {
      if (current.value === SettingDropdownEnum.Profile) {
      } else if (current.value === SettingDropdownEnum.UserManagement) {
        this.router.navigateByUrl('/user-management');
        // window.open('/user-management', "_blank");
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
}
