import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { DashboardCardsModule } from '@shared/components/app-dashboard-cards/app-dashboard-cards.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DashboardCardsModule,
  ],
})
export class HomeModule {}
