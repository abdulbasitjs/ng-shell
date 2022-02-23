import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AccessControlService } from '@core/services/access-control.service';

@Directive({
  selector: '[appAccessControl]',
})
export class AccessControlDirective implements OnInit {
  @Input('appAccessControl') set appAccessControl(moduleType: string) {
    this.renderAuthorization(moduleType);
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vc: ViewContainerRef,
    private accessControlService: AccessControlService
  ) {}

  ngOnInit(): void {}

  renderAuthorization(moduleType: string) {
    const currentAccessControls =
      this.accessControlService.getProjectAccessControls();

    if (currentAccessControls === '*') {
      this.vc.createEmbeddedView(this.templateRef);
    } else if (currentAccessControls === '!') {
      this.vc.clear();
    } else if (
      currentAccessControls &&
      currentAccessControls.exclude_controls
    ) {
      const accessControls = currentAccessControls.exclude_controls;
      const excludedModule = accessControls.find(
        (access: any) => access.module_name === moduleType
      );
      if (excludedModule) {
        this.vc.clear();
      } else this.vc.createEmbeddedView(this.templateRef);;
    }
  }
}
