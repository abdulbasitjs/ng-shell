import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtalPipe } from './portal-name.pipe';

@NgModule({
  declarations: [ProtalPipe],
  imports: [CommonModule],
  exports: [ProtalPipe],
  providers: [],
})
export class PipesModule {}
