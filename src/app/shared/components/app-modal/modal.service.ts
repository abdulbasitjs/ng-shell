import { Injectable, TemplateRef } from '@angular/core';
import { OverlayService } from '@core/services/overlay.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modal$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private templateRendered$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private overlayService: OverlayService) {}

  open(template: TemplateRef<any>) {
    this.modal$.next(template);
    this.templateRendered$.next(true);
    this.overlayService.showOverlay();
  }

  close() {
    this.modal$.next(null);
    this.templateRendered$.next(false);
    this.overlayService.hideOverlay();

  }

  getModal() {
    return this.modal$.asObservable();
  }

  getTemplateRenderState() {
    return this.templateRendered$.asObservable();
  }
}
