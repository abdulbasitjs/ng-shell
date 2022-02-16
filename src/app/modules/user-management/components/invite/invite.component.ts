import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UIMESSAGES, quotaInterval } from '@configs/index';
import { UserManagementService } from '../../services/user-management.service';
import { IModulesResponse } from '../../models/modules-response.model';
import { LoaderService } from '@core/services/loader.service';

const defaultRole = 'Select Role';

@Component({
  selector: 'app-user-invite',
  templateUrl: './invite.component.html',
})
export class InviteUserComponent implements OnInit {
  UIMSG = UIMESSAGES;
  isPanelOpen: boolean = true;
  inviteUserForm!: FormGroup;
  quotaIntervalList = quotaInterval;
  modulesList!: IModulesResponse[];
  selectedRoles!: Array<any>;
  hasSelectedAnyRole: boolean = false;
  checkboxList!: Array<any>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public umService: UserManagementService,
    public loaderService: LoaderService
  ) {}

  get permissions() {
    return this.inviteUserForm.controls['permissions'] as FormArray;
  }

  ngOnInit(): void {
    this.inviteUserForm = this.formBuilder.group({
      full_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      permissions: this.formBuilder.array([]),
    });

    this.umService.getAdminModules().subscribe((modules) => {
      this.modulesList = modules;

      this.selectedRoles = Array.from(
        { length: this.modulesList.length },
        (_, i) => ({ [this.modulesList[i].name]: { l: defaultRole } })
      );

      this.checkboxList = Array.from(
        { length: this.modulesList.length },
        () => false
      );

      this.buildModuleFormArray(modules);
    });
  }

  onInviteUser() {
    const { full_name: name, email } = this.inviteUserForm.value;
    const payload = {
      name,
      email,
      permission: this.selectedRoles,
    };
    console.log(payload);
    this.onClose();
  }

  onSave() {
    this.onClose();
  }

  onClose() {
    this.isPanelOpen = false;
    this.router.navigate(['../'], { relativeTo: this.route });
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
    this.hasSelectedAnyRole = [
      this.selectedRoles[i][this.getRoles(i).name].l !== defaultRole,
      this.checkboxList.some((el) => !!el),
    ].every((el) => el);
  }

  onCheck(event: any, i: number) {

    // NOTE: There is bug regarding hasSelectedAnyRole
    setTimeout(() => {
      if (!event.target.checked) {
        this.hasSelectedAnyRole = false;
      }
      this.canSendInvite(i);
    }, 0);
    this.checkboxList[i] = event.target.checked;
  }
}
