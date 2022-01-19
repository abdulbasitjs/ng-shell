import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtiProvisioningPackagesComponent } from './oti-provisioning-packages.component';

describe('OtiProvisioningPackagesComponent', () => {
  let component: OtiProvisioningPackagesComponent;
  let fixture: ComponentFixture<OtiProvisioningPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtiProvisioningPackagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtiProvisioningPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
