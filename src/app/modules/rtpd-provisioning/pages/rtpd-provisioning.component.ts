import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from '@core/header/header.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rtpd-provisioning',
  templateUrl: './rtpd-provisioning.component.html',
  styleUrls: ['./rtpd-provisioning.component.scss'],
})
export class RtpdProvisioningComponent implements OnInit, OnDestroy {
  routerSubscription!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private headerService: HeaderService
  ) {
    this.routerIntilization();
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

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
