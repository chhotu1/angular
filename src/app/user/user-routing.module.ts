import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Guard
import { AuthGuard } from '../guard/auth.guard';
import { Role } from '../model/role'

//component
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

const userRoutes: Routes = [
  { path: '',
  component: LayoutComponent,
  canActivate:[AuthGuard],
  data: {
    role: Role.User
  },
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate:[AuthGuard],
      data: {
        role: Role.User
      },
    },
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate:[AuthGuard],
      data: {
        role: Role.User
      },
    },

  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
