import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OTI_DASHBOARD_KEY, OTI_PROVISIONING_KEY, RTPD_DASHBOARD_KEY, RTPD_PROVISIONING_KEY } from '@configs/ui.config';
import { AuthGuard } from '@core/guards/auth.guard';
import { DashboarResolverGuard } from '@core/guards/dashboard.resolver';
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
      roles: DashboarResolverGuard
    }
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    canActivate: [AuthGuard, RoleGuard],
    path: OTI_PROVISIONING_KEY,
    loadChildren: () =>
      import('./modules/oti-provisioning/oti-provisioning.module').then(
        (m) => m.OtiProvisioningModule
      ),
    data: {
      project: {
        title: 'OTI',
        desc: 'Provisioning',
        key: OTI_PROVISIONING_KEY
      }
    },
  },
  {
    canActivate: [AuthGuard, RoleGuard],
    path: OTI_DASHBOARD_KEY,
    loadChildren: () =>
      import('./modules/oti-dashboard/oti-dashboard.module').then(
        (m) => m.OtiDashboardModule
      ),
    data: {
      project: {
        title: 'OTI',
        desc: 'Dashboard',
        key: OTI_DASHBOARD_KEY
      }
    },
  },
  {
    canActivate: [AuthGuard, RoleGuard],
    path: RTPD_PROVISIONING_KEY,
    loadChildren: () =>
      import('./modules/rtpd-provisioning/rtpd-provisioning.module').then(
        (m) => m.RtpdProvisioningModule
      ),
    data: {
      project: {
        title: 'RTPD',
        desc: 'Provisioning',
        key: RTPD_PROVISIONING_KEY
      }
    },
  },
  {
    canActivate: [AuthGuard, RoleGuard],
    path: RTPD_DASHBOARD_KEY,
    loadChildren: () =>
      import('./modules/rtpd-dashboard/rtpd-dashboard.module').then(
        (m) => m.RtpdDashboardModule
      ),
    data: {
      project: {
        title: 'RTPD',
        desc: 'Dashboard',
        key: RTPD_DASHBOARD_KEY
      }
    },
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
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
