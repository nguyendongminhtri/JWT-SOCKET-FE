import {Component, OnInit} from '@angular/core';
import {SignUpForm} from '../../model/SignUpForm';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  status = 'Please fill in the form register!';
  form: any = {};
  signUpForm: SignUpForm;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  hide = true;
  error1: any = {
    message: 'noemail'
  };
  error2: any = {
    message: 'nouser'
  };
  success: any = {
    message: 'yes'
  };
  checkSuccess : boolean = false;
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  ngSumit() {
    this.signUpForm = new SignUpForm(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    );
    this.authService.signup(this.signUpForm).subscribe(data => {
        if(JSON.stringify(data) == JSON.stringify(this.error1)){
          this.status = 'The email is existed! Please try again!'
        }
        if(JSON.stringify(data) == JSON.stringify(this.error2)){
          this.status = 'The username is existed! Please try again'
        }
        if(JSON.stringify(data) == JSON.stringify(this.success)){
          this.checkSuccess = true;
          this.status = 'Create success --> '
        }
    });
  }
}
