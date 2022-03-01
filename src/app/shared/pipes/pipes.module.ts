import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtalPipe } from './portal-name.pipe';
import { StatusPipe } from './status.pipe';
import { NumberFormatPipe } from './nFormat.pipe';

@NgModule({
  declarations: [ProtalPipe, StatusPipe, NumberFormatPipe],
  imports: [CommonModule],
  exports: [ProtalPipe, StatusPipe, NumberFormatPipe],
  providers: [],
})
export class PipesModule {}
