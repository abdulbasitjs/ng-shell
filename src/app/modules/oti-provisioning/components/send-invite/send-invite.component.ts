import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UIMESSAGES } from '@configs/ui';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { LoaderService } from '../../../../core/services/loader.service';

type tag = { key: number; value: string };

@Component({
  selector: 'app-customer-send-invite',
  templateUrl: './send-invite.component.html',
})
export class AppCustomerSendInviteComponent implements OnInit, OnDestroy {
  uiMessage = UIMESSAGES;
  isPanelOpen: boolean = true;
  noEmailScreen: boolean = false;
  addEmailScreen: boolean = false;
  currentEmails: Array<tag> = [];
  emailIsAlreadAdded = false;

  customerSubscription!: Subscription;
  emailChangeSubscription!: Subscription;
  customer: any;
  sendInviteForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    public loaderService: LoaderService
  ) {}

  ngOnDestroy(): void {
    if (this.customerSubscription) {
      this.customerSubscription.unsubscribe();
    }

    if (this.emailChangeSubscription) {
      this.emailChangeSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.sendInviteForm = this.formBuilder.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
          ),
        ],
      ],
    });
    this.initializeCustomer();

    this.emailChangeSubscription = this.emailControl.valueChanges.subscribe(
      (val) => {
        this.emailIsAlreadAdded = false;
      }
    );
  }

  initializeCustomer() {
    this.customerSubscription = this.customerService
      .getCustomerObservable()
      .subscribe((customer) => {
        if (customer) {
          this.customer = customer;
          this.currentEmails = this.customer.sendInvite.email.map(
            (el: any, i: number) => ({
              key: i + 1,
              value: el,
            })
          );
          if (!this.currentEmails.length) {
            this.noEmailScreen = true;
          }
        }
      });
  }

  onClose() {
    this.isPanelOpen = false;
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  onEmailBlur() {
    this.emailControl.markAsUntouched();
    this.emailIsAlreadAdded = false;
  }

  onAddEmail() {
    this.emailControl.markAsTouched();
    if (this.sendInviteForm.valid) {
      const { email } = this.sendInviteForm.value;
      if (this.currentEmails.some((el) => el.value === email)) {
        this.emailIsAlreadAdded = true;
      } else {
        this.emailIsAlreadAdded = false;
        this.currentEmails.unshift({
          key: this.currentEmails.length + 1,
          value: email.toLowerCase(),
        });
        this.sendInviteForm.patchValue({
          email: '',
        });
        this.emailControl.markAsUntouched();
      }
    }
  }

  createPayload(sendEmail: boolean) {
    const emails = this.currentEmails.map((el) => el.value).join(',');
    const payload = {
      id: this.customer.id,
      emails,
      sendEmails: sendEmail,
    };

    return payload;
  }

  onSave() {
    this.customerService
      .sendInvite(this.createPayload(false))
      .subscribe((res) => {
        this.addEmailScreen = false;
      });
  }

  onSendEmail() {
    this.customerService
      .sendInvite(this.createPayload(true))
      .subscribe((res) => {
        this.onClose();
      });
  }

  showAddRemoveEmailScreen() {
    this.sendInviteForm.reset();
    this.addEmailScreen = true;
  }

  onTagClear(tag: tag) {
    const index = this.currentEmails.findIndex((el) => el.value === tag.value);
    this.currentEmails.splice(index, 1);
  }

  get emailControl() {
    return this.sendInviteForm.get('email') as FormControl;
  }
}
