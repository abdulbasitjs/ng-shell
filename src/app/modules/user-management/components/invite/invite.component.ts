import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UIMESSAGES, quotaInterval } from '@configs/index';
import { UserManagementService } from '../../services/user-management.service';
import { IModulesResponse } from '../../models/modules-response.model';
import { LoaderService } from '@core/services/loader.service';
import { Subscription } from 'rxjs';
import { IUserItem } from '../../user-management.model';

const defaultRole = 'Select Role';

@Component({
  selector: 'app-user-invite',
  templateUrl: './invite.component.html',
})
export class InviteUserComponent implements OnInit, OnDestroy {
  UIMSG = UIMESSAGES;
  isPanelOpen: boolean = true;
  inviteUserForm!: FormGroup;
  quotaIntervalList = quotaInterval;
  modulesList!: IModulesResponse[];
  selectedRoles!: Array<any>;
  hasSelectedAnyRole: boolean = false;
  checkboxList!: Array<any>;
  currentUser!: IUserItem;

  editMode!: string;
  routerSubscription!: Subscription;
  userSubscription!: Subscription;

  sendingInviteSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public umService: UserManagementService,
    public loaderService: LoaderService
  ) {}

  ngOnDestroy(): void {
    this.sendingInviteSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  get permissions() {
    return this.inviteUserForm.controls['permissions'] as FormArray;
  }

  ngOnInit(): void {
    this.inviteUserForm = this.formBuilder.group({
      full_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      permissions: this.formBuilder.array([]),
    });

    this.sendingInviteSubscription = this.umService
      .sendingInviteObservable()
      .subscribe((status) => {
        if (!status) this.onClose();
      });

    this.routerSubscription = this.route.params.subscribe((param) => {
      this.editMode = param['key'];
      this.getAdminModules();
      if (!!this.editMode) {
        this.userSubscription = this.umService
          .getUserObservable()
          .subscribe((user) => {
            if (user) {
              this.currentUser = user;
              this.populateEditForm();
            }
          });
      }
    });
  }

  getAdminModules() {
    this.umService.getAdminModules().subscribe((modules) => {
      if (!!this.editMode) {
        this.modulesList = modules
        .filter((el) => el.name === this.editMode && !this.currentUser?.permission[el.name]);
        console.log(this.modulesList);
      } else this.modulesList = modules;

      this.selectedRoles = Array.from(
        { length: this.modulesList.length },
        (_, i) => ({ [this.modulesList[i].name]: { l: defaultRole } })
      );

      this.checkboxList = Array.from(
        { length: this.modulesList.length },
        () => false
      );

      this.buildModuleFormArray(this.modulesList);
    });
  }

  populateEditForm() {
    this.inviteUserForm.patchValue({
      full_name: this.currentUser.name,
      email: this.currentUser.email,
    });
  }

  onInviteUser() {
    const { full_name: name, email } = this.inviteUserForm.value;
    const payload = {
      name,
      email,
      permission: {},
    };
    payload.permission = this.selectedRoles
      .filter((el, i) => {
        return this.selectedRoles[i][this.getRoles(i).name].l !== defaultRole;
      })
      .reduce((acc, cur, i) => {
        const key = Object.keys(cur)[0];
        const r = cur[key].r;
        acc[key] = { r };
        return acc;
      }, {});
    this.umService.sendInvite(payload);
  }

  onSave() {
    this.onClose();
  }

  onClose() {
    this.isPanelOpen = false;
    const backPath = !!this.editMode ? '../../' : '../';
    this.router.navigate([backPath], { relativeTo: this.route });
  }

  buildModuleFormArray(modules: IModulesResponse[]) {
    modules.map((el) => {
      el.disabled = true;
      const control = this.formBuilder.control(el);
      this.permissions.push(control);
      return control;
    });
  }

  getRoles(index: number) {
    return this.modulesList[index];
  }

  onRoleSelect(role: any, index: number) {
    const currentRole = { [role.name]: role.roles[0] };
    this.selectedRoles[index] = currentRole;
    this.canSendInvite(index);
  }

  setRoleValue(i: number) {
    return this.selectedRoles[i][this.getRoles(i).name].l;
  }

  canSendInvite(i: number) {
    if (this.checkboxList.some((el) => !!el)) {
      const truthyIndex = this.checkboxList.findIndex((el) => el === true);
      if (
        this.selectedRoles[truthyIndex][this.getRoles(truthyIndex).name].l !==
        defaultRole
      ) {
        this.hasSelectedAnyRole = true;
        return;
      }
    }
    this.hasSelectedAnyRole = false;
  }

  onCheck(event: any, i: number) {
    setTimeout(() => {
      this.checkboxList[i] = event.target.checked;
      if (!event.target.checked) {
        this.hasSelectedAnyRole = false;
      }
      this.canSendInvite(i);
    }, 0);
  }
}
