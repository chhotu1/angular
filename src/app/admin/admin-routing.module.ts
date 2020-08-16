import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './profile/profile.component';


import { RoleGuardGuard } from '../guard/role-guard.guard';
import { Role } from '../model/role';
import { UserListComponent } from './user-list/user-list.component';


const adminRoutes: Routes = [
    { path: '',
      component: LayoutComponent,
      canActivate: [RoleGuardGuard], 
      data: { 
        role: Role.Admin
      },
      children: [
        {
          path: 'home',
          component: HomeComponent,
          canActivate:[RoleGuardGuard],
          data: { 
            role: Role.Admin
          },
        },
        {
          path: 'profile',
          component: ProfileComponent,
          canActivate:[RoleGuardGuard],
          data: { 
            role: Role.Admin
          },
        },
        {
          path: 'user-list',
          component: UserListComponent,
          canActivate:[RoleGuardGuard],
          data: { 
            role: Role.Admin
          },
        },

      ]
    }
  ];
  
@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
