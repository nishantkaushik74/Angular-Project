import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';
import { SignUPService } from 'src/app/Services/sign-up.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  formForgotPassword: FormGroup;
  forgotPasswordModel: any = {};
  endPoint: any;
  constructor(
    private formBuilder: FormBuilder,
    private _apiService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.formForgotPassword = this.formBuilder.group({
      email: ['']
    });
  }
  ngOnInit() {
    this.endPoint = this.route.snapshot.url.join('/').split("/")[0];
    if (this.endPoint == 'forgotpassword') {
      this.endPoint = 0
    }
    else this.endPoint = 1
  }


  async sendEmail() {
    try {
      const request = await this._apiService.resetPasswordForEmail(this.formForgotPassword.value)

    } catch (error) {
      
    }
  }
  
  async resetPassword() {
  }
}
