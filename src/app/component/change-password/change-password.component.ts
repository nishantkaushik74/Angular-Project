import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { SignUPService } from 'src/app/Services/sign-up.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  currentPassword: string = "";
  newPassword: string = "";
  confirmPassword: string = "";
  constructor(
    private _apiService: SignUPService, private router: Router
  ) { }
  onSubmit(formvalue: any) {
    this.changePassword(formvalue.value)

    // Reset form fields after submission if needed
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }
  async changePassword(formvalue: any) {
    const a = await this._apiService.UpdatePsswordAuthUser(formvalue)
    if (a) {
      this.router.navigate(['login']);
    }

  }
}
