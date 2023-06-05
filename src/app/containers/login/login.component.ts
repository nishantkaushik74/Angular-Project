import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { createClient } from '@supabase/supabase-js';
import { SignInModel } from '../../Model/signIn';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  data1:any;
  formLogin: FormGroup;
  loginModel: SignInModel = {
    email: '',
    password: '',
    Id: 0
  };
  supabaseUrl = 'https://your-supabase-url.supabase.co';
  supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsdWlmYm9sbmR5ZnRla3l5cGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxNzUyOTQsImV4cCI6MTk5NTc1MTI5NH0.iJ9PgJDflSITsO-1nveTkdQMBb0Fc3iSnRHds2CwmI8';
  supabase = createClient(this.supabaseUrl, this.supabaseKey);

  user = new BehaviorSubject<SignInModel>({ email: '', password: '', Id: 0 });

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.pattern]]
    });
  }

  async login() {
    try {
      const { data, error } = await this.loginService.loginData(this.loginModel);
      if (data && data.session) {
        console.log('Login successful!', data);
        const token = data.session.access_token; // Extract the token value from the session object
        localStorage.setItem('token', token); // Store the token in local storage
        this.router.navigate(['/comment']); 
        alert('Login successful!');
         // Redirect to comments page
      } else if (error) {
        alert('Invalid credentials');
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred during login');
    }
  }
  
  
  

  async signUp() {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email: this.loginModel.email,
        password: this.loginModel.password
      });
      if (data) {
        console.log('Sign up successful!', data);
        alert('Sign up successful! Please login to continue.');
      } else if (error) {
        alert('Sign up failed');
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred during sign up');
    }
  }
}
