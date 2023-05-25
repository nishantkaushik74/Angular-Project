import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent 
{
  formUserData:any;
  constructor(private formBuilder : FormBuilder ){}
  ngOnInit(){
    this.formUserData = this.formBuilder.group({
      Questions:[],
      Option1:[],
      Option2:[],
      Option3:[],
      Option4:[],
     
    })
   }
   
}

