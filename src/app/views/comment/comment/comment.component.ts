import { Component, OnInit } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { CommentService } from '../../../Services/comment.service';
import * as uuid from 'uuid';
import { Comment } from '../../../Model/comment'
import { json } from 'stream/consumers';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/Model/Question';
import { log } from 'console';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  supabaseUrl = 'https://gluifbolndyftekyypbl.supabase.co';
  supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsdWlmYm9sbmR5ZnRla3l5cGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxNzUyOTQsImV4cCI6MTk5NTc1MTI5NH0.iJ9PgJDflSITsO-1nveTkdQMBb0Fc3iSnRHds2CwmI8';
  supabaseClient = createClient(this.supabaseUrl, this.supabaseKey);
  userData: any;
  answers!: { [x: string]: any; }[];
  profile!: { [x: string]: any; }[];
  questionId!: number;
  route: any;

  postAnswer: any;
  data = [''];
  question: any = [];
  questions: any = [];
  model = {} as Question;
  postquestion: any;
  data1: any
  username: any;
  profileData: any;
  newData: any = [];
  // userdetail=JSON.parse(localStorage.getItem('userinformation')!) as any;
  constructor(private _comment: CommentService, private router: Router, private routerA: ActivatedRoute) {

  }
  async getQuestions() {

    type DataObject = {
      qFullName: any;
      question: any;
      questionID: any;
      userID: any;
      answers?: any;
    };
    const userId = this.routerA.snapshot.queryParams['userid'];

    // Fetch all questions from the 'Questions' table in Supabase
    const Questions = await this.supabaseClient.from('Questions').select('*');
    const Profiles = await this.supabaseClient.from('Profile').select('*')
    this.questions = Questions.data;;
    const Answers = await this.supabaseClient.from('Answers').select('*')

    // if (Profiles["data"] && Questions["data"] && Answers["data"]) {

    //   const data: DataObject[] = [];
    //   for (let i = 0; i < Questions["data"].length; i++) {
    //     for (let j = 0; j < Profiles["data"].length; j++) {
    //       if (Profiles["data"][j]["userid"] == Questions["data"][i]["userid"]) {
    //         var qFullName = Profiles["data"][j]["fullName"];
    //         var question = Questions["data"][i]["question"];
    //         var questionID = Questions["data"][i]["id"];
    //         var userID = Questions["data"][i]["userid"];
    //       }
    //     }
    //     data.push({ qFullName: qFullName, question: question, questionID: questionID, userID: userID });
    //   }

    //   for (let l = 0; l < Answers["data"].length; l++) {
    //     for (let obj of data) {
    //       if (obj["questionID"] === Answers["data"][l]["questionid"]) {
    //         const FilterProfile = Profiles["data"].filter((profile) => Answers["data"][l]["userid"] === profile["userid"]).map((profile) => profile["fullName"]);
    //         obj["answers"] = [
    //           { name: FilterProfile[0], answer: Answers["data"][l]["answer"] }
    //         ];
    //       }
    //     }
    //   }
    //   this.newData = data
    //   console.log("🚀 ~ file: comment.component.ts:83 ~ CommentComponent ~ getQuestions ~ this.newData:", this.newData)
    // }




    if (Profiles["data"] && Questions["data"] && Answers["data"]) {
      const data: DataObject[] = [];
    
      for (let i = 0; i < Questions["data"].length; i++) {
        for (let j = 0; j < Profiles["data"].length; j++) {
          if (Profiles["data"][j]["userid"] == Questions["data"][i]["userid"]) {
            var qFullName = Profiles["data"][j]["fullName"];
            var question = Questions["data"][i]["question"];
            var questionID = Questions["data"][i]["id"];
            var userID = Questions["data"][i]["userid"];
          }
        }
        data.push({ qFullName: qFullName, question: question, questionID: questionID, userID: userID });
      }
    
      for (let l = 0; l < Answers["data"].length; l++) {
        for (let obj of data) {
          if (obj["questionID"] === Answers["data"][l]["questionid"]) {
            const FilterProfile = Profiles["data"]
              .filter((profile) => Answers["data"][l]["userid"] === profile["userid"])
              .map((profile) => profile["fullName"]);
   
            if (!obj["answers"]) {
              obj["answers"] = [];
            }
    
            obj["answers"].push({
              name: FilterProfile[0],
              answer: Answers["data"][l]["answer"]
            });
          }
        }
      }
      this.newData = data;
      console.log("🚀 ~ file: comment.component.ts:83 ~ CommentComponent ~ getQuestions ~ this.newData:", this.newData);
    }
    
  };



  ngOnInit() {
    this.getQuestions();
  }
  navigateToQuestion(questionId: string) {
    this.router.navigate(['/questionScreen', questionId]);
  }

}



// const questions = Questions["data"]?.map((question) => {
//   return question["question"]
// })
// const questionsID = Questions["data"]?.map((question) => {
//   return question["id"]
// })
// const answers = Answers["data"]?.map((question) => {
//   return question["answer"]
// })
// const Q_id_in_answer = Answers["data"]?.map((question) => {
//   return question["questionid"]
// })