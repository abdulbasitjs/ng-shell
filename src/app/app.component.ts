import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { OverlayService } from '@core/services/overlay.service';
import { ModalService } from '@shared/components/app-modal/modal.service';
import { Subscription } from 'rxjs';
import { PlaceholderDirective } from './shared/directives/placeholder/placeholder.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(PlaceholderDirective, { static: false })
  modalHost!: PlaceholderDirective;
  showHeader = false;
  showOverlay = false;
  overlaySubscription!: Subscription;

  constructor(
    public overlayService: OverlayService,
    public authService: AuthenticationService,
    public modalService: ModalService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.modalService.getModal().subscribe((template) => {
      if (template) {
        const modalHostVCR = this.modalHost.vcr;
        modalHostVCR.clear();
        modalHostVCR.createEmbeddedView(template);
      } else {
        this.modalHost.vcr.clear();
      }
    });
  }

  ngOnInit(): void {
    this.router.events.forEach((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event['url'] == '/auth/login') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.overlaySubscription.unsubscribe();
  }
}
