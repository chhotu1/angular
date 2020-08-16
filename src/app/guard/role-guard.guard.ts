import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService} from '../service/user.service';
// import decode from 'jwt-decode';
import * as decode from 'jwt-decode';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  constructor(public auth: UserService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = route.data.role;
    console.log(role,'role acccess in route');
    if (this.auth.isAuthenticated() && role==localStorage.getItem('role')) {
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
    
  }
  // canActivate(route: ActivatedRouteSnapshot): boolean {
  //   // this will be passed from the route config
  //   // on the data property
  //   const expectedRole = route.data.expectedRole;
  //   console.log(expectedRole,'expectedRole')
  //   if(localStorage.getItem('role')==expectedRole){
  //     console.log("yes admin")
  //   }else{
  //     console.log("no admin")
  //   }
  //   const token = localStorage.getItem('token');

  //   // decode the token to get its payload
  //   const tokenPayload = decode(token);
  //   if (!this.auth.isAuthenticated() || tokenPayload !== expectedRole) {
  //     this.router.navigate(['login']);
  //     return false;
  //   }
  //   return true;
  // }
  
}
