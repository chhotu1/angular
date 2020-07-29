import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';

const adminRoutes: Routes = [
    { path: '',
      component: LayoutComponent,
      children: [
        {
          path: 'home',
          component: HomeComponent,
        }
      ]
      }
  ];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
