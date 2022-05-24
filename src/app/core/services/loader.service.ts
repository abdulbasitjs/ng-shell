import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingMap: Map<string, boolean> = new Map<string, boolean>();
  private loader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private progressWidth$: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );

  constructor() {
    // this.status$ = this.subject.asObservable().pipe(delay(0));
  }

  showLoader() {
    this.loader$.next(true);
    this.progressWidth$.next(0);
  }

  hideLoader() {
    this.loader$.next(false);
  }

  getProgressWidth() {
    return this.progressWidth$.asObservable();
  }

  getLoader() {
    return this.loader$.asObservable();
  }

  isLoading() {
    return this.loader$.value;
  }

  setLoading(loading: boolean, url: string): void {
    if (!url) {
      throw new Error(
        'The request URL must be provided to the LoadingService.setLoading function'
      );
    }
    if (loading === true) {
      this.loadingMap.set(url, loading);
      this.loader$.next(true);
      // this.progressWidth$.next(0);
      // this.overlayService.showOverlay();
    } else if (loading === false && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }
    if (this.loadingMap.size === 0) {
      this.loader$.next(false);
      // this.progressWidth$.next(100);
      // this.overlayService.hideOverlay();
    }
  }
}
