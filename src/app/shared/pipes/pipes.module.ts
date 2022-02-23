import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtalPipe } from './portal-name.pipe';
import { StatusPipe } from './status.pipe';

@NgModule({
  declarations: [ProtalPipe, StatusPipe],
  imports: [CommonModule],
  exports: [ProtalPipe, StatusPipe],
  providers: [],
})
export class PipesModule {}
