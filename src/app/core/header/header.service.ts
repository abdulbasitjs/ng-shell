import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export type Module = {
  title: string;
  desc: string;
  route?: string;
  selected?: boolean;
  hideIcon?: boolean;
  hideHeaderMenu?: boolean;
} | null;

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private selectedModule$: BehaviorSubject<Module> = new BehaviorSubject<Module>(
    null
  );

  constructor(private router: Router) {}

  setCurrentModule(currentModule: Module) {
    if (currentModule && currentModule.route) {
      this.router.navigateByUrl(currentModule.route);
    }
    this.selectedModule$.next(currentModule);
  }

  getCurrentModule() {
    return this.selectedModule$.asObservable();
  }
}
