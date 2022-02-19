import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { AppButtonModule } from '@shared/components/app-btn/app-button.module';
import { DirectivesModule } from '@shared/directives/directives.module';
import { AppLoaderModule } from '@shared/components/app-loader/loader.module';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ResetComponent } from './pages/reset/reset.component';
import { AuthSectionComponent } from './components/auth-section/auth-section.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthActionComponent } from './components/auth-action/auth-action.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotComponent,
    AuthComponent,
    ResetComponent,
    AuthSectionComponent,
    AuthActionComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    AppButtonModule,
    DirectivesModule,
    AppLoaderModule,
  ],
})
export class AuthModule {}
