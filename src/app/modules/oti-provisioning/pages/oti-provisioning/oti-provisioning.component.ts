import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sidebar } from '@shared/components/app-side-bar/interfaces/sidebar';
import { Subscription } from 'rxjs';
import { OtiProvisioningSideBarList } from '@configs/index';
import { HeaderService } from '@core/header/header.service';
import { ModalService } from '@shared/components/app-modal/modal.service';
import { PlaceholderDirective } from '@shared/directives/placeholder/placeholder.directive';

@Component({
  selector: 'app-oti-provisioning',
  templateUrl: './oti-provisioning.component.html',
  styleUrls: ['./oti-provisioning.component.scss'],
  host: {
    class: 'oti-provisioning',
  },
})
export class OtiProvisioningComponent implements OnInit, OnDestroy, AfterViewInit {
  sidebarList!: Sidebar[];
  routerSubscription!: Subscription;
  @ViewChild(PlaceholderDirective, { static: false })
  modalHost!: PlaceholderDirective;

  constructor(
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private modalService: ModalService
  ) {
    this.routerIntilization();
    this.sidebarList = OtiProvisioningSideBarList;
  }

  ngAfterViewInit(): void {
    this.modalService.getModal().subscribe((template) => {
      if (template) {
        const modalHostVCR = this.modalHost.vcr;
        modalHostVCR.clear();
        modalHostVCR.createEmbeddedView(template);
      } else {
        this.modalHost.vcr.clear();
      }
    });
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
