import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { OverlayService } from '@core/services/overlay.service';
import { Subscription } from 'rxjs';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, AfterContentChecked {
  loading = false;
  showOverlay = false;

  showHeader = false;
  is404Page = false;
  overlaySubscription!: Subscription;
  loaderSubscription!: Subscription;

  constructor(
    private loaderService: LoaderService,
    private router: Router,
    private overlayService: OverlayService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterContentChecked(): void {
    // Prevent from change detection
    // TODO Can cause performance hit. Need to fix this later.
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.router.events.forEach((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event['url'].indexOf('auth') > -1) {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }

        if (event['urlAfterRedirects'] === '/404') {
          this.is404Page = true;
        }
      }
    });

    this.loaderSubscription = this.loaderService
      .getLoader()
      .subscribe((state) => {
        this.loading = state;
      });

    this.overlaySubscription = this.overlayService
      .getOverlay()
      .subscribe((overlay) => {
        this.showOverlay = overlay;
      });
  }

  ngOnDestroy(): void {
    if (this.loaderSubscription) this.loaderSubscription.unsubscribe();
    if (this.overlaySubscription) this.overlaySubscription.unsubscribe();
  }
}
