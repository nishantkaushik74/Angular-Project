import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import {v4 as uuidv4} from 'uuid';
import { Question } from '../Model/Question';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }
  private supabaseUrl = 'https://gluifbolndyftekyypbl.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsdWlmYm9sbmR5ZnRla3l5cGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxNzUyOTQsImV4cCI6MTk5NTc1MTI5NH0.iJ9PgJDflSITsO-1nveTkdQMBb0Fc3iSnRHds2CwmI8';
  private supabaseClient = createClient(this.supabaseUrl, this.supabaseKey);
   myuuid = uuidv4();
  //  userId!: string;
 
  // async getQuestions(): Promise<any> {
  //   const { data = [], error } = await this.supabaseClient.from('Questions').select('*');
  //   if (error) {
  //   } else {
  //     return data as Question[];
  //   }
  // }
  async postQuestion(model: any): Promise<any> {
   
    // const user = this.supabaseClient.auth.users();
    const { data, error } = await this.supabaseClient
      .from('Questions')
      .insert(model);
    if (error) {
      return error;
    }
    else {
      return data
    }

}
}

