import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivesModule } from '@shared/directives/directives.module';
import { DashboardCardsModule } from '@shared/components/app-dashboard-cards/app-dashboard-cards.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    DirectivesModule,
    HttpClientModule,
    DashboardCardsModule
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
