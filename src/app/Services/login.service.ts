import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SignInModel } from '../Model/signIn';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private supabaseUrl = 'https://gluifbolndyftekyypbl.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsdWlmYm9sbmR5ZnRla3l5cGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxNzUyOTQsImV4cCI6MTk5NTc1MTI5NH0.iJ9PgJDflSITsO-1nveTkdQMBb0Fc3iSnRHds2CwmI8';
  private supabase: SupabaseClient = createClient(this.supabaseUrl, this.supabaseKey);

  constructor() { }
  loginData(logInModel: SignInModel) {
    debugger;
    return this.supabase.auth.signInWithPassword(logInModel);
  }

}
