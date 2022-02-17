import {
  Component,
  OnInit,
  OnDestroy,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '@shared/components/app-modal/modal.service';
import { Subscription } from 'rxjs';
import { IModulesResponse } from '../../models/modules-response.model';
import { UserManagementService } from '../../services/user-management.service';
import { IUserItem } from '../../user-management.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  host: {
    class: 'user-detail',
  },
})
export class UserDetailComponent implements OnInit, OnDestroy {
  @ViewChild('changePermissionModalTemplate') cpModal!: TemplateRef<any>;
  private _userId!: number;
  public adminModules!: IModulesResponse[];
  public user!: IUserItem;
  private userSubscription!: Subscription;
  private routerSubscription!: Subscription;
  private adminModulesSubscription!: Subscription;
  isPermissionLoaded = false;
  constructor(
    public umService: UserManagementService,
    private router: Router,
    private route: ActivatedRoute,
    public modalService: ModalService
  ) {}

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.adminModulesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.routerSubscription = this.route.params.subscribe((param) => {
      this._userId = param && param['id'];
      this.umService.getUser(param['id']);
    });

    this.userSubscription = this.umService
      .getUserObservable()
      .subscribe((user) => {
        if (user) {
          this.user = user;
          this.adminModulesSubscription = this.umService
            .getAdminModules()
            .subscribe((adminModules) => {
              this.adminModules = this._checkPermissions(adminModules);
              this.isPermissionLoaded = true;
            });
        }
      });
  }

  private _checkPermissions(adminModules: IModulesResponse[]) {
    return adminModules.map((el) => {
      return {
        ...el,
        roles: [...el.roles, { c: -1, r: '', l: 'Revoke Access' }],
        isInvited: !!this.user.permission[el.name],
        currentUserPermission: this.user.permission[el.name],
      };
    });
  }

  changePermission(event: any) {
    this.modalService.open(this.cpModal);
  }

  onChangePermission() {
    console.log('Change Permission');
  }

  onModalClose() {
    this.modalService.close();
  }
}
