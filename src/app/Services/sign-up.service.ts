import { Injectable } from '@angular/core';
import { SupabaseClient, AuthChangeEvent, PostgrestResponse, PostgrestSingleResponse, createClient } from '@supabase/supabase-js';
import { SignUpModel } from '../Model/signUp';
import { v4 as uuidv4 } from 'uuid';
import { userInfo } from 'os';
import { log } from 'console';
import { ToastService } from 'angular-toastify';


@Injectable({
  providedIn: 'root'
})
export class SignUPService {
  UpdatePsswordAuthUser(formvalue: any) {
    throw new Error('Method not implemented.');
  }

  userIdString = JSON.parse(localStorage.getItem("sb-gluifbolndyftekyypbl-auth-token") ?? '[]');
  private supabase: SupabaseClient;
  supabaseClient: any;
  // userId = JSON.parse(localStorage.getItem("sb-gluifbolndyftekyypbl-auth-token"));
  constructor(private _toastService: ToastService) {
    this.supabase = createClient('https://gluifbolndyftekyypbl.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsdWlmYm9sbmR5ZnRla3l5cGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxNzUyOTQsImV4cCI6MTk5NTc1MTI5NH0.iJ9PgJDflSITsO-1nveTkdQMBb0Fc3iSnRHds2CwmI8');
  }
  // async showToast() {
  //   //  this._toastService.info('Login successful')
  // }
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
    // this.showToast()

    if (form.email) {
      const { data, error } = await this.supabase.auth.updateUser({ email: form.email })
    }
    const { data, error } = await this.supabase.from('Profile')
      .update({
        fullName: form.name,
        state: form.state,
        phoneNumber: form.mobile,
        gstn: form.gstin,
        pincode: form.pincode,
      })
      .eq('userid', this.userIdString.user.id)


    if (error) {
      throw error.message;
    }
    if (error == null) {
    }
  }
  async userInfo(): Promise<any> {
    const { data: { user } } = await this.supabase.auth.getUser()
    if (user) {
      return user
    }
  }

  async profileData(): Promise<any> {
    const userIdString = JSON.parse(localStorage.getItem("sb-gluifbolndyftekyypbl-auth-token") ?? '[]');

    console.log("this.userIdString.user.id", userIdString.user.id);

    const { data, error } = await this.supabase.from('Profile').select('*')
      .eq('userid', userIdString.user.id)
      .single();

    if (error) {
      throw new Error('An error occurred while fetching user information');
    }

    if (data) {
      return data;
    }
  }
  async getTableData(tableName: string): Promise<any> {
    const { data, error } = await this.supabase
      .from(tableName)
      .select("*")
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      return data
    }
  }
  async getTableDataOnParentID(tableName: string, conditionvalues: any): Promise<any> {
    const { data, error } = await this.supabase
      .from(tableName)
      .select()
      .eq('parentid', conditionvalues.id)
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      return data
    }
  }
  async updateActTable(tableName: any, subject: any, inputValue: any): Promise<any> {
    const { data, error } = await this.supabase
      .from(tableName)
      .upsert({ moduleid: inputValue.id, Name: subject.variant })
      .select()
    if (error) {
      console.log("🚀 ~ file: sign-up.service.ts:120 ~ SignUPService ~ updateActTable ~ error:", error.message)
      throw new Error(error.message);
    }
    if (data) {
      return data
    }
  }
  async updateModuleInfo(tableName: any, subject: any, inputValue: any): Promise<any> {
    console.log("🚀 ~ file: sign-up.service.ts:115 ~ SignUPService ~ updateActTable ~ inputValue:", inputValue)
    console.log("🚀 ~ file: sign-up.service.ts:115 ~ SignUPService ~ updateActTable ~ subject:", subject)
    const { data, error } = await this.supabase
      .from(tableName)
      .upsert({ moduleid: inputValue.moduleid, Name: subject.variant, parentid: inputValue.id, data: subject.variant2 })
      .select()
    if (error) {
      console.log("🚀 ~ file: sign-up.service.ts:120 ~ SignUPService ~ updateActTable ~ error:", error.message)
      throw new Error(error.message);
    }
    if (data) {
      return data
    }
  }
  
}



