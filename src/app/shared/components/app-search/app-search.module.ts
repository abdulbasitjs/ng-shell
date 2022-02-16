import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, AngularSvgIconModule],
  exports: [SearchComponent],
})
export class AppSearchModule {}
