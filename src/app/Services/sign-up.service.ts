import { Injectable } from '@angular/core';
import { SupabaseClient, AuthChangeEvent, PostgrestResponse, PostgrestSingleResponse, createClient } from '@supabase/supabase-js';
import { SignUpModel } from '../Model/signUp';
import { v4 as uuidv4 } from 'uuid';
import { userInfo } from 'os';


@Injectable({
  providedIn: 'root'
})
export class SignUPService {
  private supabase: SupabaseClient;
  supabaseClient: any;


  constructor() {
    this.supabase = createClient('https://gluifbolndyftekyypbl.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsdWlmYm9sbmR5ZnRla3l5cGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxNzUyOTQsImV4cCI6MTk5NTc1MTI5NH0.iJ9PgJDflSITsO-1nveTkdQMBb0Fc3iSnRHds2CwmI8');
  }

 
  async signUp(model: SignUpModel): Promise<any> {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email: model.email,
        password: model.password,
      });
      if (data != null) {
        const response = await this.supabase
          .from('Profile')
          .insert([{ fullName: model.fullName, userid: data.user?.id }]);
        if (response.data) {
          console.log(response.data);
        }
        if (response.error) {
          console.log('Error inserting user profile:', response.error);
          return;
        }

        console.log('Signup and profile insert successful');
      }
      if (error) {
        console.log('Error signing up:', error);
        return;
      }


    } catch (error) {
      console.log('Error:', error);
    }
  }
  // login(model) {
  //   return this.supabase.auth.signIn({
  //     email: email,
  //     password: password
  //   });
  // }

  // logout() {
  //   return this.supabase.auth.signOut();
  // }

  // getCurrentUser() {
  //   return this.supabase.auth.user();
  // }
}


