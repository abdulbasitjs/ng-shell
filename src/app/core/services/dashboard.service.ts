import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export type DashboardHeader = {
  title: string;
  desc: string;
  route?: string;
  selected: boolean;
} | null;
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  selectedDashboard$: BehaviorSubject<DashboardHeader> =
    new BehaviorSubject<DashboardHeader>(null);

  shouldShowHeader$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  constructor(private router: Router) {}

  setCurrentDashboard(currentDashboard: DashboardHeader) {
    if (currentDashboard && currentDashboard.route) {
      this.router.navigateByUrl(currentDashboard.route);
    }
    this.selectedDashboard$.next(currentDashboard);
  }

  showHeader() {
    this.shouldShowHeader$.next(true);
  }

  hideDashboard() {
    this.shouldShowHeader$.next(false);
  }

  getshouldShowHeader() {
    return this.shouldShowHeader$.asObservable();
  }

  getCurrentDashboard() {
    return this.selectedDashboard$.asObservable();
  }
}
