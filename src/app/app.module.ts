import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { AuthGuard } from '@core/guards/auth.guard';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppLoaderModule } from '@shared/components/app-loader/loader.module';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboarResolverGuard } from './core/guards/dashboard.resolver';
import { RoleGuard } from '@core/guards/role.guard';
import { AppModalModule } from '@shared/components/app-modal/app-modal.module';
import { AppModalComponent } from '@shared/components/app-modal/components/modal/modal.component';
import { DirectivesModule } from '@shared/directives/directives.module';
import { AppOverlayModule } from '@shared/components/app-overlay/app-ovarlay.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AppLoaderModule,
    AppModalModule,
    DirectivesModule,
    AngularSvgIconModule.forRoot(),
    NgxDaterangepickerMd.forRoot(),
    NgxSkeletonLoaderModule.forRoot({
      theme: {
        'background-color': getComputedStyle(
          document.documentElement,
          null
        ).getPropertyValue('--color-primary'),
        opacity: '0.1',
        top: "10px"
      },
    }),
    AppOverlayModule
  ],
  providers: [AuthGuard, DashboarResolverGuard, RoleGuard],
  bootstrap: [AppComponent],
  entryComponents: [AppModalComponent],
})
export class AppModule {}
