import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserManagementSideBarList } from '@configs/index';
import { HeaderService } from '@core/header/header.service';
import { Sidebar } from '@shared/components/app-side-bar/interfaces/sidebar';
import { Subscription } from 'rxjs';
import { ModalService } from '@shared/components/app-modal/modal.service';
import { PlaceholderDirective } from '@shared/directives/placeholder/placeholder.directive';

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
  @ViewChild(PlaceholderDirective, { static: false })
  modalHost!: PlaceholderDirective;

  constructor(
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private modalService: ModalService
  ) {
    this.routerIntilization();
  }

  ngOnInit(): void {}

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

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
