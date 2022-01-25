import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from '@core/services/data-storage.service';
import { Sidebar } from '@shared/components/app-side-bar/interfaces/sidebar';
import { DashboardService } from '@core/services/dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-oti-provisioning',
  templateUrl: './oti-provisioning.component.html',
  styleUrls: ['./oti-provisioning.component.scss'],
  host: {
    class: 'oti-provisioning',
  },
})
export class OtiProvisioningComponent implements OnInit, OnDestroy {
  sidebarList!: Sidebar[];
  routerSubscription!: Subscription;
  constructor(
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private dashboardService: DashboardService
  ) {
    this.sidebarList =
      this.dataStorageService.getOtiProvisioningSidebarValues();

    this.routerSubscription = this.route.data.subscribe((data) => {
      if (data && data['project']) {
        const { title, desc } = data['project'];
        this.dashboardService.setCurrentDashboard({
          title,
          desc,
          selected: true,
        });
      }
    });
  }
  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  ngOnInit(): void {}
}
