import { Injectable } from '@angular/core';
import { SupabaseClient, AuthChangeEvent, PostgrestResponse, PostgrestSingleResponse, createClient } from '@supabase/supabase-js';
import { SignUpModel } from '../Model/signUp';
import { v4 as uuidv4 } from 'uuid';
import { userInfo } from 'os';
import { log } from 'console';


@Injectable({
  providedIn: 'root'
})
export class SignUPService {
  userIdString = JSON.parse(localStorage.getItem("sb-gluifbolndyftekyypbl-auth-token") ?? '[]');

  private supabase: SupabaseClient;
  supabaseClient: any;
  // userId = JSON.parse(localStorage.getItem("sb-gluifbolndyftekyypbl-auth-token"));

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
  async updatingProfileData(form: any): Promise<any> {
    if (form.email) {
      const { data, error } = await this.supabase.auth.updateUser({ email: form.email })
    }
    const { error } = await this.supabase.from('Profile')
      .update({
        fullName: form.name,
        state: form.state,
        phoneNumber: form.mobile,
        gstn: form.gstin,
        pincode: form.pincode,
      })
      .eq('userid', this.userIdString.user.id)

    if (error) {
      throw error.message; ``
    }
  }
  async userInfo(): Promise<any> {
    const { data: { user } } = await this.supabase.auth.getUser()
    if (user) {
      return user
    }
  }

  async profileData(): Promise<any> {
    const { data, error } = await this.supabase.from('Profile').select('*')
      .eq('userid', this.userIdString.user.id)
      .single();

    if (error) {
      throw new Error('An error occurred while fetching user information');
    }

    if (data) {
      return data;
    }
  }

  async getTableData(name_of_table: string, actname: any): Promise<any> {
    if (!actname || actname === null || actname === "null") {
      console.log("Working");

      const { data, error } = await this.supabase
        .from(name_of_table)
        .select('*')
        .is('parent_id', actname);
      if (error) {
        console.log("🚀 ~ file: sign-up.service.ts:99 ~ SignUPService ~ getTableData ~ error:", error)
        // throw new Error(error);
      }
      if (data) {
        return data;
      }
    }
    if (actname) {
      // console.log("Working2");
      const { data, error } = await this.supabase
        .from(name_of_table)
        .select('*')
        .eq('parent_id', 1)
        .eq('name_of_act', actname);
      if (data) {
        return data;
      }
      if (error) {
        console.log(error.message)
      }
    }
  }
  async insertData(name_of_table: string, formData: any, subject_section: any): Promise<any> {


    if (formData && subject_section === null) {
      console.log("Working");
      const { error } = await this.supabase.
        from(name_of_table).
        insert({
          userid: this.userIdString.user.id,
          name_of_act: formData.data,
        })
    }
    if (subject_section && formData === null) {
      const { error } = await this.supabase.
        from(name_of_table).
        insert({
          userid: this.userIdString.user.id,
          name_of_act: subject_section.actName,
          subject_section: subject_section.data,
          parent_id: 1
        })
    }

  }
  async deleteRow(name_of_table: string, formData: any): Promise<any> {
    const { error } = await this.supabase
      .from(name_of_table)
      .delete()
      .eq('id', formData.id)
  }
}


