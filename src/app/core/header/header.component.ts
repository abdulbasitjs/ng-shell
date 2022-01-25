import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { settingDropdownList } from '@configs/ui.config';
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
  showHeaderSubscription!: Subscription;
  showSelectedHeader: boolean = false;
  settingList: Array<any> = settingDropdownList;

  constructor(public dashboardService: DashboardService) {}

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
      .getShowSelectedDashboard()
      .subscribe((state) => {
        this.showSelectedHeader = state;
      });
  }

  ngOnDestroy(): void {
    this.headerSubscription.unsubscribe();
    this.showHeaderSubscription.unsubscribe();
  }

  onSettingItemSelect(event: any) {
    console.log(event);
  }
}
