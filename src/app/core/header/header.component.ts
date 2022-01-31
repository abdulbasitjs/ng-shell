import { Component, OnDestroy, OnInit } from '@angular/core';
import { settingDropdownList } from '@configs/ui.config';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { DashboardService } from '@core/services/dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerTitle!: string;
  headerDesc!: string;
  headerSubscription!: Subscription;

  showSelectedHeader: boolean = false;
  showHeaderSubscription!: Subscription;
  settingList: Array<any> = settingDropdownList;

  constructor(
    public dashboardService: DashboardService,
    public authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.headerSubscription = this.dashboardService
      .getCurrentDashboard()
      .subscribe((dashboard) => {
        if (dashboard) {
          this.headerTitle = dashboard.title;
          this.headerDesc = dashboard.desc;
        }
      });

    this.showHeaderSubscription = this.dashboardService
      .getshouldShowHeader()
      .subscribe((state) => {
        // Prevent from Angular Chnage detection.
        setTimeout(() => {
          this.showSelectedHeader = state;
        }, 0);
      });
  }

  ngOnDestroy(): void {
    this.headerSubscription.unsubscribe();
    this.showHeaderSubscription.unsubscribe();
  }

  onSettingItemSelect(event: any) {
    if (event && event.value === 'logout') {
      this.authService.logout();
    }
  }
}
