import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@shared/directives/directives.module';
import { DataTableComponent } from './components/datatable/datatable.component';
import { DataTableHeadersComponent } from './components/datatable-headers/datatable-headers.component';
import { DataTableRowsComponent } from './components/datatable-rows/datatable-row.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [
    DataTableComponent,
    DataTableHeadersComponent,
    DataTableRowsComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    AngularSvgIconModule.forRoot(),
    NgxSkeletonLoaderModule,
    PipesModule
  ],
  exports: [
    DataTableComponent,
    DirectivesModule,
    DataTableHeadersComponent,
    DataTableRowsComponent,
  ],
})
export class AppDataTableModule {}
