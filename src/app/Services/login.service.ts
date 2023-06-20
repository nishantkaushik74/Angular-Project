import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SignInModel } from '../Model/signIn';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private supabaseUrl = 'https://gluifbolndyftekyypbl.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsdWlmYm9sbmR5ZnRla3l5cGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxNzUyOTQsImV4cCI6MTk5NTc1MTI5NH0.iJ9PgJDflSITsO-1nveTkdQMBb0Fc3iSnRHds2CwmI8';
  private supabase: SupabaseClient = createClient(this.supabaseUrl, this.supabaseKey);
  public isAuthenticated: boolean = false;
  user = new BehaviorSubject<SignInModel>(null!);

  constructor(private router: Router, private _toastService: ToastService
  ) { }

  // Check if the user is authenticated
  isAuthenticated1(): boolean {
    return this.isAuthenticated;
  }
  showToast(a: any) {
    if (a == 0) { this._toastService.success('Login successful') }
    else { this._toastService.error(a.message) }
  }
  // Perform login and set isAuthenticated to true
  async loginData(logInModel: any): Promise<any> {

    const { data, error } = await this.supabase.auth.signInWithPassword({ email: logInModel.email, password: logInModel.password })

    if (error) {
      this.showToast(error)
      throw new Error(error.message);
    }
    if (data) {
      const token = await data?.session?.access_token;
      localStorage.setItem('user', JSON.stringify(data));
      this.isAuthenticated = true;
      setTimeout(() => {
        this.router.navigate(['/comment']);
      }, 1000);
      this.showToast(0)
      return data
    }
  }
  async logout(): Promise<{ error: string | null }> {
    try {
      await this.supabase.auth.signOut();
      return { error: null };
    } catch (error) {
      return { error: (error as Error).message };

    }
  }

  async resetPasswordForEmail(subject: any): Promise<any> {

    const { data, error } = await this.supabase.auth.resetPasswordForEmail(subject.email, {
      redirectTo: 'http://localhost:4200/resetPassword',
      
    })
    if (error) {
      console.log("🚀 ~ error:", error)
      throw new Error(error.message);
    }
    if (data) {
      console.log("🚀 ~  data:", data)

      return data
    }
  }

}
