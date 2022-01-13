import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { DashboardCardsModule } from '@shared/app-dashboard-cards/app-dashboard-cards.module';
import { DirectivesModule } from '@shared/directives/directives.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [DirectivesModule, CommonModule, DashboardCardsModule],
  exports: [HeaderComponent],
})
export class HeadersModule {}
