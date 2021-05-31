import { Injectable } from '@angular/core';
const TOKEN_KEY = 'Token_key';
const NAME_KEY = 'Name_key';
const ROLE_KEY = 'Role_key';
const USERNAME_KEY = 'Username_key'
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private roles: Array<string> = [];
  constructor() { }
  public setToken(token: string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }
  public setUsername(username: string){
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY,username);
  }
  public getUsername(): string {
    return window.sessionStorage.getItem(USERNAME_KEY);
  }
  public getToken(): string{
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public setName(name: string){
    window.sessionStorage.removeItem(NAME_KEY);
    window.sessionStorage.setItem(NAME_KEY,name);
  }
  public getName(): string{
    return window.sessionStorage.getItem(NAME_KEY);
  }
  public setRoles(roles: string[]){
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, JSON.stringify(roles));
  }
  public getRoles(): string[]{
    this.roles = [];
    if(sessionStorage.getItem(TOKEN_KEY)){
      JSON.parse(sessionStorage.getItem(ROLE_KEY)).forEach(role=>{
        console.log('get ROLE_KEY = ', sessionStorage.getItem(ROLE_KEY))
        console.log('role.authority === ', role.authority)
        this.roles.push(role.authority)
      })
    }
    return this.roles;
  }
  }
