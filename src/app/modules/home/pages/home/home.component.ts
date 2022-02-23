import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardCard } from '@shared/components/app-dashboard-cards/interfaces/dashboard-card';
import { Subscription } from 'rxjs';
import { SSORoles } from '@configs/index';
import { HeaderService } from '@core/header/header.service';
import { ProfileService } from 'src/app/modules/user-profile/services/profile-management.service';

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
  roles!: SSORoles;

  constructor(
    public pmService : ProfileService,
    private headerService: HeaderService,
    private route: ActivatedRoute
  ) {
    this.routerIntilization();
  }

  ngOnInit(): void {
  }

  handleDashboardSelect(item: DashboardCard) {
    // console.log(item);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  routerIntilization() {
    this.routerSubscription = this.route.data.subscribe((data) => {
      if (data) {
        if (data['isHomePage']) {
          this.headerService.setCurrentModule({
            title: '',
            desc: '',
            hideIcon: true,
            hideHeaderMenu: true,
          });

          if (data['roles']) {
            this.roles = data['roles'];
          }
        }
      }
    });
  }
}
