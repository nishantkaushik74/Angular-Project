import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'
import { MatIconRegistry } from '@angular/material/icon';
import { SignUpModel } from '../../Model/signUp';
import { SignUPService } from '../../Services/sign-up.service'
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  formsignup: any;
  fullName!:string;
  email!: string;
  password!: string;
  signUpModelObj: SignUpModel = new SignUpModel()

  constructor(
    private formBuilder: FormBuilder,
    private _apiService: SignUPService,private routerA: Router
  ) { }
  ngOnInit(): void {
    this.formsignup = this.formBuilder.group({
      fullName:['',Validators.required],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  addData() {
    debugger;
    const fullName = this.formsignup.controls['fullName'].value;
    const email = this.formsignup.controls['email'].value;
    const password = this.formsignup.controls['password'].value;
  
    // Check if email or password is null
    if (!email || !password ||!fullName) {
      alert('Invalid data. Please fill in both email and password fields.');
      return;
    }
    // this.signUpModelObj.fullName = this.formsignup.controls['fullName'].value;
    // this.signUpModelObj.email = this.formsignup.controls['email'].value;
    // this.signUpModelObj.password = this.formsignup.controls['password'].value;
  
    this._apiService.signUp(this.formsignup.value)
      .then((data) => {
        debugger;
        console.log('Sign up successful!', data);
        localStorage.setItem('userinformation',JSON.stringify(data));
        alert('Sign up successful!');

        window.location.href ='/#/login';
      })
      .catch(error => {
        console.log(error);
        alert('Error occurred while signing up. Please try again later.');
      });
  }

  storeUserId(userId: string) {
    this.routerA.navigate(['/comment'], { queryParams: { userid: userId }});
  }
  

}
