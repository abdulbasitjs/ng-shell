import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { ModalService } from '@shared/components/app-modal/modal.service';
import { Subscription } from 'rxjs';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  showHeader = false;
  is404Page = false;
  showOverlay = false;
  overlaySubscription!: Subscription;

  constructor(
    public loaderService: LoaderService,
    public authService: AuthenticationService,
    public modalService: ModalService,
    private router: Router
  ) {}

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
  }

  ngOnDestroy(): void {
    this.overlaySubscription.unsubscribe();
  }
}
