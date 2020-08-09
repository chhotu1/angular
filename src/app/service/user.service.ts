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
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

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

  // TODO - use this func later
  get isLoggedIn123() {

    if (this.getToken().length > 0 ) {
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable();
  }
  // TODO - remove this and use BehaviorSubject
  isLoggedIn(): boolean {
    return this.getToken().length > 0;
  }

   isAuthenticated(): boolean {
    const token = localStorage.getItem('userToken');
    // Check whether the token is expired and return true or false
    //console.log("isTokenExpired " +this.jwtHelper.isTokenExpired(token));
    if(this.jwtHelper.isTokenExpired(token)){
      localStorage.removeItem('userToken');
      this.loggedIn.next(false);
      this.router.navigate(['/home']);
    }
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
    localStorage.setItem('userToken', token);
    localStorage.setItem('email', email);
  }

  saveToken(token: string) {
    localStorage.setItem('userToken', token);
  }

  saveRole(role: string) {
    localStorage.setItem('role', role);
  }

  getToken() {
    return localStorage.getItem('userToken') || '';
  }

  getRole() {
    return localStorage.getItem('role') || '';
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
    this.router.navigate(['/']);
  }

  logout() {
    console.log("auth service logout")
    this.loggedIn.next(false);
    localStorage.removeItem('userToken');
    // localStorage.removeItem('role');
    this.router.navigate(['/home']);
    // contextDataManager.clearData();
  }
  
  createAuthorizationHeader() {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders ({
     'Content-Type': 'application/json',
     'Authorization': token
   });
  }

  changePassword = (credential: any) => {
    const header = this.createAuthorizationHeader();
    console.log('-- Auth Service - changePassword --',header,credential);
    return this.http.post(`${API_ENDPOINT}/api/auth/change-password`, credential,{ headers: header });
  }

  getAllUsers() {
    const header = this.createAuthorizationHeader();
    return this.http.get(`${API_ENDPOINT}/api/auth/change-password`,{ headers: header });
  }



}
