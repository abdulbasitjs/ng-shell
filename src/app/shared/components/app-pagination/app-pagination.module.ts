import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@shared/directives/directives.module';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginationListComponent } from './components/pagination-list/pagination-list.component';
import { DropdownDirectionDirective } from './directives/direction.directive';

@NgModule({
  declarations: [
    PaginationComponent,
    PaginationListComponent,
    DropdownDirectionDirective,
  ],
  imports: [CommonModule, DirectivesModule],
  exports: [PaginationComponent, PaginationListComponent],
})
export class AppPaginationModule {}
