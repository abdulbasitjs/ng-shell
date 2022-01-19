import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtiProvisioningCustomerDetailComponent } from './oti-provisioning-customer-detail.component';

describe('OtiProvisioningCustomerDetailComponent', () => {
  let component: OtiProvisioningCustomerDetailComponent;
  let fixture: ComponentFixture<OtiProvisioningCustomerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtiProvisioningCustomerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtiProvisioningCustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
