import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignUpForm} from '../model/SignUpForm';
import {Observable} from 'rxjs';
import {SignInForm} from '../model/SignInForm';
import {JwtResponse} from '../model/JwtResponse';
const TOKEN_KEY = 'Token_key';
const NAME_KEY = 'Name_key';
const ROLE_KEY = 'Role_key';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
//API LOCAL
  private API_SIGNUP = 'http://localhost:8080/api/auth/signup';
  private API_SIGNIN = 'http://localhost:8080/api/auth/signin';
  constructor(private http: HttpClient) { }
  signup(signUpForm: SignUpForm): Observable<any>{
    return this.http.post<any>(this.API_SIGNUP, signUpForm);
  }
  signin(signInForm: SignInForm): Observable<JwtResponse>{
    return this.http.post<JwtResponse>(this.API_SIGNIN, signInForm);
  }
  loggined() {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const username = sessionStorage.getItem(NAME_KEY);
    const authority = sessionStorage.getItem(ROLE_KEY);
    if (username && token && authority) {
      return true;
    }
    return false;
  }
}
