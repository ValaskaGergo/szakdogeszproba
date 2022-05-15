import {Routes} from "@angular/router";

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";

export const AppRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  // {
  //   path: '',
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  //     }
  //   ]
  // },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
]
