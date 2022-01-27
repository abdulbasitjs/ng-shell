import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { AppButtonModule } from '@shared/components/app-btn/app-button.module';
import { DirectivesModule } from '@shared/directives/directives.module';
import { AppLoaderModule } from '@shared/components/app-loader/loader.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    AppButtonModule,
    DirectivesModule,
    AppLoaderModule
  ],
})
export class AuthModule {}
