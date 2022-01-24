import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private overlay$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  showOverlay() {
    this.overlay$.next(true);
  }

  hideOverlay() {
    this.overlay$.next(false);
  }

  getOverlay() {
    return this.overlay$.asObservable();
  }
}
