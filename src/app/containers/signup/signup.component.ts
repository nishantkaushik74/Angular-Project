import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpModel } from '../../Model/signUp';
import { SignUPService } from '../../Services/sign-up.service';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  formsignup!: FormGroup;
  signUpModelObj: SignUpModel = new SignUpModel();

  constructor(
    private formBuilder: FormBuilder,
    private _apiService: SignUPService,
    private routerA: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.formsignup = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async addData() {
    if (this.formsignup.invalid) {
      this.toastService.error("Please ensure that all fields are filled correctly.");
      return;
    }

    try {
      const data = await this._apiService.signUp(this.formsignup.value)
      console.log('Sign up successful!', data);
      localStorage.setItem('userinformation', JSON.stringify(data));
      this.toastService.success('Sign up successful!');
      setTimeout(() => {
        this.routerA.navigateByUrl('/login');
      }, 2000);
    } catch (error) {
    this.toastService.error("User already exists");
    }
  }


  storeUserId(userId: string) {
    this.routerA.navigate(['/comment'], { queryParams: { userid: userId } });
  }
}
