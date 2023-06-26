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
    const { data, error } = await this.supabase.auth.signUp({
      email: model.email,
      password: model.password,
    });
    if (error) {
      throw new Error(error.message);
    }
    if (data != null) {
      const response = await this.supabase
        .from('Profile')
        .insert([{ fullName: model.fullName, userid: data.user?.id }]);
      if (response.error) {
        return response.error;
      }
      if (response.data) {
        return response.data
      }

    }
    else return data
  }
  pdf_Url: any
  async updatingProfileData(form: any): Promise<any> {
    if (form.profilePicture) {
      const path = `ProfilePictures/${form.profilePicture.name}`
      const response = await this.supabase.storage
        .from('Test')
        .upload(path, form.profilePicture)
      if (response.error) {
        console.error('Error uploading file:', response.error.message);
        return; // Exit the function if there was an error
      }
      this.pdf_Url = `https://gluifbolndyftekyypbl.supabase.co/storage/v1/object/public/Test/${response?.data?.path}`
    }
    if (form.email) {
      const updated = await this.supabase.from('Profile')
        .update({
          fullName: form.name,
          state: form.state,
          phoneNumber: form.mobile,
          gstn: form.gstin,
          pincode: form.pincode,
          profilePicture: this.pdf_Url,
        })
        .eq('userid', this.userIdString.user.id)

      if (updated.error) {
        console.log(updated);
        throw updated.error.message;
      }
      if (updated.error == null) {
        console.log(updated);
      }

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
      .upsert({ moduleid: inputValue, Name: subject.variant })
      .select()
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      return data
    }
  }
  async updateModuleInfo(tableName: any, subject: any, inputValue: any): Promise<any> {
    const { data, error } = await this.supabase
      .from(tableName)
      .upsert({ moduleid: inputValue.moduleid, Name: subject.variant, parentid: inputValue.id, data: subject.variant2 })
      .select()
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      return data
    }
  }
  async getTableDataOnEndPoint(tableName: string, endPoint: any): Promise<any> {
    const { data, error } = await this.supabase
      .from(tableName)
      .select("*")
      .eq('description', endPoint)

    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      return data
    }
  }

  async updateModuleInfoTable(tableName: any, subject: any, id: any): Promise<any> {
    let path: any;
    debugger
    if (subject.PDF_file.name || subject.PDF_file.name !== undefined) {
      console.log("working");

      path = `uploads/${subject.PDF_file.name}`;
    }

    const response = await this.supabase.storage
      .from('Test')
      .upload(path, subject.PDF_file)
    if (response.error) {
      console.error('Error uploading file:', response.error.message);
      return; // Exit the function if there was an error
    }
    if (subject) {
      const pdf_Url = `https://gluifbolndyftekyypbl.supabase.co/storage/v1/object/public/Test/${response?.data?.path}`;
      let { data, error } = await this.supabase
        .from(tableName)
        .upsert({ moduleid: id, Name: subject.addedValue, data: subject.variant2, URL: pdf_Url })
        .select()
      if (error) {
        throw new Error(error.message);
      }
      if (data) {
        return data
      }
    }

  }
  async getModuleInfoTableData(tableName: string, moduleid: any, parentId: any): Promise<any> {
    const { data, error } = await this.supabase
      .from(tableName)
      .select("*")
      .eq('moduleid', moduleid)
      .is('parentid', parentId)

    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      return data
    }
  }
  async UpdatePsswordAuthUser(subject: any): Promise<any> {
    if (subject.newPassword === subject.confirmPassword) {
      const { data, error } = await this.supabase.auth.updateUser({ password: subject.confirmPassword })
      if (error) {
        throw new Error(error.message);
      }
      if (data) {
        return data
      }
    }
    else alert("Not equal")
  }
  async updatetableee(tableName: any, subject: any, id: any): Promise<any> {
    let { data, error } = await this.supabase
      .from(tableName)
      .upsert({ moduleid: id, Name: subject.date, data: subject.variant2})
      .select()
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      return data
    }

  }

  async getModuleInfoTableDataa(tableName: string, moduleid: any, parentId: any): Promise<any> {
    console.log("🚀 ~ file: sign-up.service.ts:239 ~ SignUPService ~ getModuleInfoTableDataa ~ parentId:", parentId)
    const { data, error } = await this.supabase
      .from(tableName)
      .select("*")
      .eq('moduleid', moduleid)
      .eq('Name', parentId)

    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      return data
    }
  }
}



