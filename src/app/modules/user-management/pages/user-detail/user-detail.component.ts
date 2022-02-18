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
import { LoaderService } from '../../../../core/services/loader.service';
import { ToastrService } from 'ngx-toastr';

const REVOKE_ACCESS = 'Revoke Access';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  host: {
    class: 'user-detail',
  },
})
export class UserDetailComponent implements OnInit, OnDestroy {
  @ViewChild('changePermissionModalTemplate') cpModal!: TemplateRef<any>;
  @ViewChild('revokePermissionModalTemplate') rpModal!: TemplateRef<any>;
  private _newRole!: { key: string; role: string };
  public adminModules!: IModulesResponse[];
  public user!: IUserItem;
  private userSubscription!: Subscription;
  private routerSubscription!: Subscription;
  private adminModulesSubscription!: Subscription;
  isPermissionLoaded = false;
  constructor(
    public umService: UserManagementService,
    private route: ActivatedRoute,
    public modalService: ModalService,
    public loaderService: LoaderService,
    private toaster: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.adminModulesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.routerSubscription = this.route.params.subscribe((param) => {
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
        roles: [...el.roles, { c: -1, r: '', l: REVOKE_ACCESS }],
        isInvited: !!this.user.permission[el.name],
        currentUserPermission: this.user.permission[el.name],
      };
    });
  }

  changePermission(event: any) {
    this._newRole = { role: event.roles[0].r, key: event.name };
    if (this._newRole.role) {
      this.modalService.open(this.cpModal);
    } else {
      this.modalService.open(this.rpModal);
    }
  }

  onChangePermission() {
    const payload = {
      ...this.user,
      permission: {
        [this._newRole.key]: { r: this._newRole.role },
      },
    };
    this.umService.updateUser(payload).subscribe((d: any) => {
      this.onModalClose();
      this.toaster.success(d['message'], 'Success!');
    });
  }

  onModalClose() {
    this.modalService.close();
  }
}
