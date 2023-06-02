import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import {v4 as uuidv4} from 'uuid';
import { Answer } from '../Model/answer';
@Injectable({
  providedIn: 'root'
})
export class QuestionScreenService {
  constructor() { }
  private supabaseUrl = 'https://gluifbolndyftekyypbl.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsdWlmYm9sbmR5ZnRla3l5cGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxNzUyOTQsImV4cCI6MTk5NTc1MTI5NH0.iJ9PgJDflSITsO-1nveTkdQMBb0Fc3iSnRHds2CwmI8';
  private supabaseClient = createClient(this.supabaseUrl, this.supabaseKey);
   myuuid = uuidv4();
 
  async postAnswers(modelAnswer: any): Promise<any> {
    debugger;
   
    // const user = this.supabaseClient.auth.users();
    const { data, error } = await this.supabaseClient
      .from('Answers')
      .insert(modelAnswer);
    if (error) {
      return error;
    }
    else {
      return data
    }

  }
}
