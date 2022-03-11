import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './components/tags/app-tags.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [TagsComponent],
  imports: [CommonModule, AngularSvgIconModule],
  exports: [TagsComponent],
})
export class AppTagsModule {}
