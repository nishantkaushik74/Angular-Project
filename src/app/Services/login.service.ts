import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SignInModel } from '../Model/signIn';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private supabaseUrl = 'https://gluifbolndyftekyypbl.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsdWlmYm9sbmR5ZnRla3l5cGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxNzUyOTQsImV4cCI6MTk5NTc1MTI5NH0.iJ9PgJDflSITsO-1nveTkdQMBb0Fc3iSnRHds2CwmI8';
  private supabase: SupabaseClient = createClient(this.supabaseUrl, this.supabaseKey);
  public isAuthenticated: boolean = false;
  user = new BehaviorSubject<SignInModel>(null!);

  constructor(private router: Router) {}

  // Check if the user is authenticated
  isAuthenticated1(): boolean {
    return this.isAuthenticated;
  }

  // Perform login and set isAuthenticated to true
  loginData(logInModel: SignInModel): Promise<{ data: any; error: string | null }> {
    const { email, password } = logInModel;
    if (email && password) {
      return this.supabase.auth.signInWithPassword({ email, password })
        .then(response => {
          this.isAuthenticated = true;
          this.router.navigate(['/comment']);
          return { data: response.data, error: null };
        })
        .catch(error => {
          return { data: null, error };
        });
    } else {
      return Promise.resolve({ data: null, error: 'Invalid email or password' });
    }
  }
}
