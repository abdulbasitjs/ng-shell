import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { AuthGuard } from '@core/guards/auth.guard';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { AppLoaderModule } from '@shared/components/app-loader/loader.module';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboarResolverGuard } from './core/guards/dashboard.resolver';
import { RoleGuard } from '@core/guards/role.guard';
import { AppModalModule } from '@shared/components/app-modal/app-modal.module';
import { AppModalComponent } from '@shared/components/app-modal/components/modal/modal.component';
import { DirectivesModule } from '@shared/directives/directives.module';

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
    NgxDaterangepickerMd.forRoot()
  ],
  providers: [AuthGuard, DashboarResolverGuard, RoleGuard],
  bootstrap: [AppComponent],
  entryComponents: [AppModalComponent],
})
export class AppModule {}
