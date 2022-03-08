import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sidebar } from '@shared/components/app-side-bar/interfaces/sidebar';
import { OtiDashboardSideBarList } from '@configs/index';
import { HeaderService } from '@core/header/header.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-oti-dashboard',
  templateUrl: './oti-dashboard.component.html',
  styleUrls: ['./oti-dashboard.component.scss']
  host: {
    class: 'oti-dashboard',
  },
})
export class OtiDashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  sidebarList!: Sidebar[];
  routerSubscription!: Subscription;
  

  constructor(private route: ActivatedRoute, private headerService: HeaderService) {
    this.routerIntilization();
    this.sidebarList = OtiDashboardSideBarList;
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
