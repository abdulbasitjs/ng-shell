import { Injectable, OnDestroy } from '@angular/core';
import { StoragePrefix } from '@shared/models/storage-prefix.enum';
import { share, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService implements OnDestroy {
  private onSubject = new Subject<{ key: string; value: any }>();
  public changes = this.onSubject.asObservable().pipe(share());

  constructor() {
    this.start();
  }

  userKey = `${StoragePrefix.SSO}user`;

  public get(key: string) {
    const item = localStorage.getItem(key);
    const numPatt = new RegExp(/^\d+$/);
    const jsonPatt = new RegExp(/[\[\{].*[\}\]]/);

    if (item) {
      if (jsonPatt.test(item)) {
        return JSON.parse(item);
      } else if (numPatt.test(item)) {
        return parseFloat(item);
      } else {
        return item;
      }
    } else {
      return null;
    }
  }

  public set(key: string, value: any) {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }

    if (this.userKey === key) {
      this.onSubject.next({ key: key, value });
    }
  }

  remove(key: string) {
    localStorage.removeItem(key);
    if (this.userKey === key) {
      this.onSubject.next({ key: key, value: -1 });
    }
  }

  getToken() {
    const user = this.get(this.userKey);
    if (user) {
      return user.token;
    } else {
      return null;
    }
  }

  getRefreshToken() {
    const user = this.get(this.userKey);
    if (user) {
      return user.refreshToken;
    } else {
      return null;
    }
  }

  ngOnDestroy() {
    this.stop();
  }

  private start(): void {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea == localStorage) {
      if (event.key === this.userKey && event.oldValue && !event.newValue) {
        this.onSubject.next({ key: event.key, value: -1 });
      }
    }
  }

  private stop(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
    this.onSubject.complete();
  }
}
