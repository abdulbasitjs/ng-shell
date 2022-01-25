import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AccessControlService } from '@core/services/access-control.service';

@Directive({
  selector: '[appAccessControl]',
})
export class AccessControlDirective implements OnInit {
  @Input('appAccessControl') set appAccessControl(moduleType: string) {
    this.renderAuthorization(moduleType);
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private accessControlService: AccessControlService
  ) {}

  ngOnInit(): void {}

  renderAuthorization(moduleType: string) {
    const currentAccessControls =
      this.accessControlService.getProjectAccessControls();

    if (currentAccessControls && currentAccessControls.access_controls) {
      const accessControls = currentAccessControls.access_controls;
      const module = accessControls.find((access: any) => access.module_name === moduleType);
      this.renderer.addClass(this.elementRef.nativeElement, module['action']);
    }

    if (currentAccessControls === '!') {
      this.renderer.addClass(this.elementRef.nativeElement, 'hide');
    }
  }
}
