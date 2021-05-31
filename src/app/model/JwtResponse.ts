export class JwtResponse {
  public token: string;
  public name: string;
  public username: string;
  public roles: any[];
  constructor(token: string, name: string, username:string, roles: any[]) {
    this.token = token;
      this.name = name;
      this.username = username;
      this.roles = roles;
  }
}
