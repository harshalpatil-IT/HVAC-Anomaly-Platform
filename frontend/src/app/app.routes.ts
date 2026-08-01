import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { DeviceDetails } from './pages/device-details/device-details';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    component: Login
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: 'device/:id',
    component: DeviceDetails,
    canActivate: [authGuard]
  }

];