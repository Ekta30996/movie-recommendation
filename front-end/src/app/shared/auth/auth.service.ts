import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SIGNIN_ENDPOINT, SIGNUP_ENDPOINT } from 'src/app/shared/constant';
import { Signin } from 'src/app/user/signin/signin.interface';
import { Signup } from 'src/app/user/signup/signup.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  signup(signupUser: Signup): Observable<Signup> {
    return this.http.post<Signup>(SIGNUP_ENDPOINT, signupUser);
  }

  signin(signinUser: Signin): Observable<Signin> {
    return this.http.post<Signin>(SIGNIN_ENDPOINT, signinUser);
  }

  signedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  signout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
}
