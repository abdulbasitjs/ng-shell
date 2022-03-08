import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtiDashboardComponent } from './oti-dashboard.component';

describe('OtiDashboardComponent', () => {
  let component: OtiDashboardComponent;
  let fixture: ComponentFixture<OtiDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtiDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtiDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
