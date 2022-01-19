import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export type DashboardHeader = { title: string; desc: string; route?: string };
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  selectedDashboard$: BehaviorSubject<DashboardHeader> =
    new BehaviorSubject<DashboardHeader>({ title: 'OTI', desc: 'Provisioning' });
  constructor(private router: Router) {}

  setCurrentDashboard(currentDashboard: DashboardHeader) {
    if (currentDashboard.route) {
      this.router.navigateByUrl(currentDashboard.route);
    }
    this.selectedDashboard$.next(currentDashboard);
  }

  getCurrentDashboard() {
    return this.selectedDashboard$.asObservable();
  }
}
