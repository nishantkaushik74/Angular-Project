import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { SignUPService } from 'src/app/Services/sign-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  ngname: any = "";
  ngmobile: any = "";
  ngemail: any = "";
  ngstate: any = "";
  ngpincode: any = "";
  nggstin: any = "";
  profileData: any = "";

  constructor(
    private _apiService: SignUPService,
    private _toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    try {
      const user = await this._apiService.userInfo();
      this.ngemail = user.email;

      this.profileData = await this._apiService.profileData();
      this.ngname = this.profileData.fullName;
      this.ngmobile = this.profileData.phoneNumber;
      this.nggstin = this.profileData.gstn;
      this.ngstate = this.profileData.state;
      this.ngpincode = this.profileData.pincode;
    } catch (error) {
      console.error("An error occurred while fetching user info:", error);
    }
  }

  async onsubmit(form: NgForm) {
    try {
      const data = await this._apiService.updatingProfileData(form.value);
      form.resetForm(); // Reset the form to clear the input fields
      await this.getData(); // Update the data after submitting
      this._toastService.success("Profile updated successfully");
    } catch (error) {
      console.error("An error occurred while updating profile:", error);
      this._toastService.error("Failed to update profile");
    }
  }
}
