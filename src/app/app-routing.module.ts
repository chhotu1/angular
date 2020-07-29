import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {path:'',redirectTo:'',pathMatch:'full'},
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  {
    path:'**',component:PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
