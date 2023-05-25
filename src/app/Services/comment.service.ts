import { Injectable } from '@angular/core';

import { createClient,SupabaseClient } from '@supabase/supabase-js';
import { Comment } from '../Model/comment'
import {v4 as uuidv4} from 'uuid';
import { Question } from '../Model/Question';
import { Answer } from '../Model/answer';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private supabaseUrl = 'https://gluifbolndyftekyypbl.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsdWlmYm9sbmR5ZnRla3l5cGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxNzUyOTQsImV4cCI6MTk5NTc1MTI5NH0.iJ9PgJDflSITsO-1nveTkdQMBb0Fc3iSnRHds2CwmI8';
  private supabaseClient = createClient(this.supabaseUrl, this.supabaseKey);
   myuuid = uuidv4();
  //  userId!: string;
  constructor() { }


   async getQuestions(): Promise<any> {
    debugger
    const { data = [], error } = await this.supabaseClient.from('Questions').select('*');
    if (error) {
      console.log(error);
    } else {
      return data as Question[];
    }
  }
  
  async getAnswer(): Promise<any> {
    debugger
    const { data = [], error } = await this.supabaseClient.from('Answers').select('*');
    if (error) {
      console.log(error);
    } else {
      return data as Answer[];
    }
  }
    
}
  
  

  

