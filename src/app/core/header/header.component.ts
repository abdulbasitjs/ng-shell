import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.headerSubscription = this.dashboardService
      .getCurrentDashboard()
      .subscribe((dashboard) => {
        this.headerTitle = dashboard.title;
        this.headerDesc = dashboard.desc;
      });
  }

  ngOnDestroy(): void {
    this.headerSubscription.unsubscribe();
  }
}
