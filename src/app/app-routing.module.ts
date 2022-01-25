import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { NoAuthGuard } from '@core/guards/no-auth.guard';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
      data: { isHomePage: true }
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    canActivate: [NoAuthGuard],
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    canActivate: [AuthGuard],
    path: 'oti-provisioning',
    loadChildren: () =>
      import('./modules/oti-provisioning/oti-provisioning.module').then(
        (m) => m.OtiProvisioningModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./modules/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
