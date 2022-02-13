import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UIMESSAGES } from '@configs/index';

@Component({
  selector: 'app-user-invite',
  templateUrl: './invite.component.html',
})
export class InviteUserComponent implements OnInit {
  UIMSG = UIMESSAGES;
  isPanelOpen: boolean = true;
  inviteUserForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.inviteUserForm = this.formBuilder.group({
      full_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  onInviteUser() {
    console.log(this.inviteUserForm.value);
    this.onClose();
  }

  onSave() {
    this.onClose();
  }

  onClose() {
    this.isPanelOpen = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
