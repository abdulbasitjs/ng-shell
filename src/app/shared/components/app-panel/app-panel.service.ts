import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FooterActionState } from './interfaces/panel';

const currentFooterActionState: FooterActionState = {
  next: { state: true, disable: true },
  back: { state: false },
  save: { state: false },
  close: { state: false },
};

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  private showPanel$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private btnState$: BehaviorSubject<FooterActionState> =
    new BehaviorSubject<FooterActionState>(currentFooterActionState);
  private currentAction$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  constructor(private router: Router) {
    router.events.subscribe(() => {
      this.setShowPanel(false);
    });
  }

  setShowPanel(showHide: boolean) {
    this.showPanel$.next(showHide);
  }

  getShowNav() {
    return this.showPanel$.asObservable();
  }

  isPanelOpen() {
    return this.showPanel$.value;
  }

  setCurrentActionState(state: FooterActionState) {
    this.btnState$.next(state);
  }

  getCurrentActionState() {
    return this.btnState$.asObservable();
  }

  notifyAction(type: string) {
    this.currentAction$.next(type);
  }

  getCurrentAction() {
    return this.currentAction$.asObservable();
  }
}
