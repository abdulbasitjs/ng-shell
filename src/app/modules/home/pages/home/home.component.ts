import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { DashboardCard } from '@shared/components/app-dashboard-cards/interfaces/dashboard-card';
import { DashboardService } from '@core/services/dashboard.service';
import { Subscription } from 'rxjs';
import { SSORoles } from '@shared/models/roles.model';
import { UserService } from '@core/services/user.service';

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
  test!: any;
  roles!: SSORoles;

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private userService: UserService
  ) {}

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  ngOnInit(): void {
    const { name = '' } = this.authService.getUser();
    this.username = name;
    this.routerSubscription = this.route.data.subscribe((data) => {
      if (data && data['isHomepage']) {
        this.dashboardService.shouldShowHeader$.next(true);
      } else {
        this.dashboardService.shouldShowHeader$.next(false);
      }

      if (data && data['roles']) {
        this.roles = data['roles'];
      }
    });
  }

  handleDashboardSelect(item: DashboardCard) {
    console.log(item);
  }
}
