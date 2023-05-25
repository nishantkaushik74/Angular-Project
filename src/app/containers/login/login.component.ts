import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, } from '@angular/forms';
import { createClient } from '@supabase/supabase-js';
import { SignInModel } from '../../Model/signIn'
import { LoginService } from '../../Services/login.service'
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {
  formLogin: FormGroup;

  loginModel: SignInModel = {
    email: '', password: '',
    Id: 0
  }
  supabaseUrl = 'https://gluifbolndyftekyypbl.supabase.co';
  supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsdWlmYm9sbmR5ZnRla3l5cGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxNzUyOTQsImV4cCI6MTk5NTc1MTI5NH0.iJ9PgJDflSITsO-1nveTkdQMBb0Fc3iSnRHds2CwmI8';
  supabase = createClient(this.supabaseUrl, this.supabaseKey);


  constructor(private formBuilder: FormBuilder, private _login: LoginService) {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.pattern]]
    });

  }
  async login() {
    debugger;
    await this._login.loginData(this.loginModel).then(({ data, error }) => {
      if (data.session != null) {
        console.log('login successful!', data);
        localStorage.setItem('user', JSON.stringify(data));
        
         alert('login successful!');
        window.location.href = '/#/comment';
      } else if (error) {
        alert('Invalid Credentials');
        console.log(error);
      }
    })
  }
  
  
}
