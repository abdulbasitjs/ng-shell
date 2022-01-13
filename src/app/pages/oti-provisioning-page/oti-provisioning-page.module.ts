import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './oti-provisioning-page-routing.module';
import { HeadersModule } from '@features/headers/headers.module';
import { OtiProvisioningModule } from '@features/oti-provisioning/oti-provisioning.module';
import { OtiProvisioningPageComponent } from './oti-provisioning-page.component';
import { CoreModule } from '@core/core.module';
import { AppSideBarModule } from '@shared/app-side-bar/app-side-bar.module';

@NgModule({
  declarations: [OtiProvisioningPageComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    CoreModule,
    HeadersModule,
    OtiProvisioningModule,
    AppSideBarModule,
  ],
})
export class OtiProvisiongPageModule {}
