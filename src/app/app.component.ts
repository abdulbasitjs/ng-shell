import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { OverlayService } from '@core/services/overlay.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  showOverlay = false;
  overlaySubscription!: Subscription;

  isAuthenticated: boolean = false;
  constructor(
    public overlayService: OverlayService,
    public authService: AuthenticationService,
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.overlaySubscription.unsubscribe();
  }
}
