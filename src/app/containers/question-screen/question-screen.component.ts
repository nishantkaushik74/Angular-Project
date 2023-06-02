import { Component, OnInit } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { Question } from 'src/app/Model/Question';
import { CommentService } from 'src/app/Services/comment.service';
import { Answer } from '../../Model/answer'
import { v4 as uuidv4 } from 'uuid';
import { QuestionScreenService } from '../../Services/question-screen.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-question-screen',
  templateUrl: './question-screen.component.html',
  styleUrls: ['./question-screen.component.scss']
})
export class QuestionScreenComponent {
  data = [''];
  question: any;
  answer: any;
  model = {} as Question;
  modelAnswer = {} as Answer;
  postquestion: any;
  Questions: any;
  supabaseUrl = 'https://gluifbolndyftekyypbl.supabase.co';
  supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsdWlmYm9sbmR5ZnRla3l5cGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxNzUyOTQsImV4cCI6MTk5NTc1MTI5NH0.iJ9PgJDflSITsO-1nveTkdQMBb0Fc3iSnRHds2CwmI8';
  supabaseClient = createClient(this.supabaseUrl, this.supabaseKey);
  questionId: any;
  currentRoute!: string;
  router: any;

  constructor(private _questionscreen: QuestionScreenService, private route: ActivatedRoute) {
    debugger;
    (async () => {
      try {
        debugger;
        let id = '';
        this.route.params.subscribe(params => {
          id = params['id'];
          console.log(id);
        })
        const { data, error } = await this.supabaseClient.from('Questions').select('*').eq('id', id);
        localStorage.setItem("questionId", JSON.stringify(id));
        console.log(this.questionId)
        if (error) {
          console.log(error);
        } else {
          this.postquestion = data;
        }
      } catch (error) {
        console.log(error);
      }

    })();

  }

  post() {
    debugger;
    const userData = JSON.parse(localStorage.getItem('user')!) as any;
    this.modelAnswer.userid = userData.user.id;
    this.modelAnswer.id = uuidv4();
    this.modelAnswer.questionid = JSON.parse(localStorage.getItem("questionId")!);
    console.log(this.modelAnswer.questionid)
    this._questionscreen.postAnswers(this.modelAnswer)
      .then((data) => {
        console.log('Answer added', data);
        alert('Answer Added!!!');
        window.history.back();
      })
      .catch(error => {
        console.log(error);
        alert('Error occurred while comment added. Please try again later.');
      });
  }
  onQuestionClick(answer: Answer) {
    this.router.navigate(['/comment'], { state: { answer : answer } });
  }
  navigateToQuestion(questionId: string) {
    this.router.navigate(['/questionScreen', questionId]);
  }
}
