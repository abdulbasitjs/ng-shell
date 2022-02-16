import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  OTI_DASHBOARD_KEY,
  OTI_PROVISIONING_KEY,
  RTPD_DASHBOARD_KEY,
  RTPD_PROVISIONING_KEY,
  USER_MANAGEMENT_KEY
} from '@configs/index';
import { AuthGuard } from '@core/guards/auth.guard';
import { DashboarResolverGuard } from '@core/guards/dashboard.resolver';
import { ModuleGuard } from '@core/guards/module.guard';
import { NoAuthGuard } from '@core/guards/no-auth.guard';
import { RoleGuard } from '@core/guards/role.guard';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
    data: { isHomePage: true },
    resolve: {
      roles: DashboarResolverGuard,
    },
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    canActivate: [NoAuthGuard],
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    canActivate: [AuthGuard, RoleGuard],
    path: USER_MANAGEMENT_KEY,
    loadChildren: () =>
      import('./modules/user-management/user-management.module').then(
        (m) => m.UserManagementModule
      ),
    data: {
      module: {
        title: 'USER',
        desc: 'Management',
      },
      expectedRoles: ['superadmin', 'admin']
    },
  },
  {
    canActivate: [AuthGuard, ModuleGuard],
    path: OTI_PROVISIONING_KEY,
    loadChildren: () =>
      import('./modules/oti-provisioning/oti-provisioning.module').then(
        (m) => m.OtiProvisioningModule
      ),
    data: {
      module: {
        title: 'OTI',
        desc: 'Provisioning',
        key: OTI_PROVISIONING_KEY,
      },
    },
  },
  {
    canActivate: [AuthGuard, ModuleGuard],
    path: OTI_DASHBOARD_KEY,
    loadChildren: () =>
      import('./modules/oti-dashboard/oti-dashboard.module').then(
        (m) => m.OtiDashboardModule
      ),
    data: {
      module: {
        title: 'OTI',
        desc: 'Dashboard',
        key: OTI_DASHBOARD_KEY,
      },
    },
  },
  {
    canActivate: [AuthGuard, ModuleGuard],
    path: RTPD_PROVISIONING_KEY,
    loadChildren: () =>
      import('./modules/rtpd-provisioning/rtpd-provisioning.module').then(
        (m) => m.RtpdProvisioningModule
      ),
    data: {
      module: {
        title: 'RTPD',
        desc: 'Provisioning',
        key: RTPD_PROVISIONING_KEY,
      },
    },
  },
  {
    canActivate: [AuthGuard, ModuleGuard],
    path: RTPD_DASHBOARD_KEY,
    loadChildren: () =>
      import('./modules/rtpd-dashboard/rtpd-dashboard.module').then(
        (m) => m.RtpdDashboardModule
      ),
    data: {
      module: {
        title: 'RTPD',
        desc: 'Dashboard',
        key: RTPD_DASHBOARD_KEY,
      },
    },
  },
  {
    path: '404',
    loadChildren: () =>
      import('./modules/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
