// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';



// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   constructor(
//     private http: HttpClient,
//     private router: Router
//   ) { }
// }



import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from '../model/role'

const API_ENDPOINT = 'http://localhost:8080';


// live server, dont use / at end of url
// const API_ENDPOINT = 'https://squared-api.herokuapp.com'
@Injectable({
  providedIn: 'root'
}) 
export class UserService {  

  private token: any;
  private email: string;
  private id: string;
  jwtHelper =  new JwtHelperService();

  result: any;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  
  // TODO - remove this and use BehaviorSubject
  isLoggedIn(): boolean {
    return this.getToken().length > 0;
  }


  //  isAuthenticated(): boolean {
  //   const token = localStorage.getItem('token');
  //   // Check whether the token is expired and return true or false
  //   //console.log("isTokenExpired " +this.jwtHelper.isTokenExpired(token));
  //   if(this.jwtHelper.isTokenExpired(token)){
  //     localStorage.removeItem('token');
  //     this.loggedIn.next(false);
  //     // this.router.navigate(['/login']);
  //   }
  //   return !this.jwtHelper.isTokenExpired(token);
  // }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    console.log(this.jwtHelper.isTokenExpired(token),'expiry');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }


  login = (credential: any) => {
    console.log('-- login --');
    this.email = credential.email;
    // contextDataManager.clearData();
    return this.http.post(`${API_ENDPOINT}/api/login`, credential);
  }

  signup = (credential: any) => {
    // this.email = credential.email;
    // contextDataManager.clearData();
    return this.http.post(`${API_ENDPOINT}/api/register`, credential);
  }

  createUser = (credential: any) => {
    return this.http.post(`${API_ENDPOINT}/api/register`, credential);
  }



  saveUser(name: string, id: string, role: string, token:string,email:string) {
    localStorage.setItem('name', name);
    localStorage.setItem('id', id);
    localStorage.setItem('role', role);
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  saveRole(role: string) {
    localStorage.setItem('role', role);
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  getRole() {
    return localStorage.getItem('role') || '';
  }

  saveUserId(id: string) {
    localStorage.setItem('id', id);
  }
   
  // isValidTenant() {
  //   return this.getRole() === 'TENANT';
  // }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

  loginDone() {
    localStorage.setItem('email', this.email);
    localStorage.getItem('id');
    this.loggedIn.next(true);
    console.log(localStorage.getItem('role'),'===============Role=======================');
    let role = localStorage.getItem('role');
    if(role==Role.Admin){
      this.router.navigate(['admin']);
    }else{
      this.router.navigate(['user']);
    }
  }

  logout() {
    console.log("auth service logout")
    this.loggedIn.next(false);
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['login']);
    // contextDataManager.clearData();
  }
  
  createAuthorizationHeader() {
    const token = localStorage.getItem('token');
    return new HttpHeaders ({
     'Content-Type': 'application/json',
     'Authorization': token
   });
  }


  getAllUsers() {
    const header = this.createAuthorizationHeader();
    return this.http.get(`${API_ENDPOINT}/api/getAllUser`,{ headers: header });
  }



}
