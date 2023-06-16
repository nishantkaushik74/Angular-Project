import { Component } from '@angular/core';
import { Question } from '../../Model/Question'
import { createClient } from '@supabase/supabase-js';
import { QuestionService } from '../../Services/question.service';
import * as uuid from 'uuid';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  question: any;
  model = {} as Question;

  postquestion: any;
  postQuestions: string[] = [];
  data = [''];
  supabaseUrl = 'https://gluifbolndyftekyypbl.supabase.co';
  supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsdWlmYm9sbmR5ZnRla3l5cGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxNzUyOTQsImV4cCI6MTk5NTc1MTI5NH0.iJ9PgJDflSITsO-1nveTkdQMBb0Fc3iSnRHds2CwmI8';
  supabaseClient = createClient(this.supabaseUrl, this.supabaseKey);
  userData: any;


  constructor(private _question: QuestionService) { }

  post() {
    ;
    const userData = JSON.parse(localStorage.getItem("user")!) as any;
    this.model.userid = userData.user.id;
    this.model.id = uuid.v4();
    this._question.postQuestion(this.model).then((data) => {
      console.log('question added', data);
      alert("Question Added!!!");
      window.history.back();
      // location.reload();
    })
      .catch(error => {
        console.log(error);
        alert('Error occurred while comment added. Please try again later.');
      });

  }
}
