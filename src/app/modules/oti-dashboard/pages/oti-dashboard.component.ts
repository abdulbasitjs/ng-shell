import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderService } from '@core/header/header.service';

@Component({
  selector: 'app-oti-dashboard',
  templateUrl: './oti-dashboard.component.html',
  styleUrls: ['./oti-dashboard.component.scss'],
})
export class OtiDashboardComponent implements OnInit, OnDestroy {
  routerSubscription!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private headerService: HeaderService
  ) {
    this.routerIntilization();
  }

  ngOnInit(): void {
  }

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

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
