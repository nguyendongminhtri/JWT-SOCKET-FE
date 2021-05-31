import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {RouterModule} from '@angular/router';
import {ThemePickerModule} from '../theme-picker';
import {ThemeStorage} from '../theme-picker/theme-storage/theme-storage';
import {StyleManager} from '../style-manager';
import {HttpClientModule} from '@angular/common/http';
import {TokenService} from '../../auth/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavBar implements OnInit{
  roles: string[] = [];
  role: string;
  isLoggedIn = false;
  name: string;
  constructor(private tokenService: TokenService) {
  }
  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.name = this.tokenService.getName();
      this.isLoggedIn = true;
      // this.roles = this.tokenService.getRoles();
      // console.log('roles', this.roles)
      // this.roles.every(authority =>{
      //   console.log('authority', authority)
      //   if(authority === 'ADMIN'){
      //     this.role = 'admin';
      //     return true;
      //   } else if(authority === 'PM'){
      //     this.role = 'pm';
      //     return true;
      //   } else if(authority === 'USER'){
      //     this.role= 'user';
      //     return true;
      //   }
      // })
    }
  }
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    ThemePickerModule,
  ],
  exports: [NavBar],
  declarations: [NavBar],
  providers: [StyleManager, ThemeStorage]
})
export class NavBarModule {

}
