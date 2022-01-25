import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtiProvisioningCustomersComponent } from './oti-provisioning-customers.component';

describe('OtiProvisioningCustomersComponent', () => {
  let component: OtiProvisioningCustomersComponent;
  let fixture: ComponentFixture<OtiProvisioningCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtiProvisioningCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtiProvisioningCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
