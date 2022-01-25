import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { DashboardCard } from '@shared/components/app-dashboard-cards/interfaces/dashboard-card';
import { DashboardService } from '@core/services/dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    class: 'dashboard',
  },
})
export class HomeComponent implements OnInit, OnDestroy {
  username!: string;
  routerSubscription!: Subscription;
  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private dashboardService: DashboardService
  ) {}

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  ngOnInit(): void {
    const { name = '' } = this.authService.getUser();
    this.username = name;

    setTimeout(() => {
      this.routerSubscription = this.route.data.subscribe((data) => {
        if (data && data['isHomepage']) {
          this.dashboardService.showSelectedDashboard$.next(true);
        } else {
          this.dashboardService.showSelectedDashboard$.next(false);
        }
      });
    }, 0);
  }

  handleDashboardSelect(item: DashboardCard) {
    console.log(item);
  }
}
