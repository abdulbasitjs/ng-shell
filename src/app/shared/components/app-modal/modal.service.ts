import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modal$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private templateRendered$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  open(template: TemplateRef<any>) {
    this.modal$.next(template);
    this.templateRendered$.next(true);
  }

  close() {
    this.modal$.next(null);
    this.templateRendered$.next(false);
  }

  getModal() {
    return this.modal$.asObservable()
  }

  getTemplateRenderState() {
    return this.templateRendered$.asObservable()
  }

}
