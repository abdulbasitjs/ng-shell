import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sidebar } from '@shared/components/app-side-bar/interfaces/sidebar';
import { Subscription } from 'rxjs';
import { OtiProvisioningSideBarList } from '@configs/index';
import { HeaderService } from '@core/header/header.service';

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
    private route: ActivatedRoute,
    private headerService: HeaderService
  ) {
    this.routerIntilization();
    this.sidebarList = OtiProvisioningSideBarList;
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  ngOnInit(): void {}

  routerIntilization() {
    this.routerSubscription = this.route.data.subscribe((data) => {
      if (data && data['module']) {
        const { title, desc } = data['module'];
        this.headerService.setCurrentModule({
          title,
          desc,
          selected: true,
        });
      }
    });
  }
}
