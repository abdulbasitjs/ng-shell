import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserManagementSideBarList } from '@configs/index';
import { HeaderService } from '@core/header/header.service';
import { Sidebar } from '@shared/components/app-side-bar/interfaces/sidebar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  host: {
    class: 'user-management',
  },
})
export class UserManagementComponent implements OnInit, OnDestroy {
  sidebarList: Sidebar[] = UserManagementSideBarList;
  routerSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private headerService: HeaderService
  ) {
    this.routerIntilization();
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
          hideIcon: true,
        });
      }
    });
  }
}
