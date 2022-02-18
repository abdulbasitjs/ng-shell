import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivesModule } from '@shared/directives/directives.module';
import { DashboardCardsModule } from '@shared/components/app-dashboard-cards/app-dashboard-cards.module';
import { ApiPrefixInterceptor } from './interceptors/api-prefix.interceptor';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { AppDropdownModule } from '@shared/components/app-dropdown/app-dropdown.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    DirectivesModule,
    DashboardCardsModule,
    AppDropdownModule,
    AngularSvgIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
