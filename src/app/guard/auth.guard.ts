import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService} from '../service/user.service';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService:UserService,private router:Router){
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = route.data.role;
    if (this.userService.isAuthenticated() && role == localStorage.getItem('role')) {
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
