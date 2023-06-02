import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignUPService } from 'src/app/Services/sign-up.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  ngname: any;
  ngmobile: any;
  ngemail: any;
  ngstate: any;
  ngpincode: any;
  nggstin: any;

  constructor(
    private _apiService: SignUPService,
  ) { }
  async ngOnInit() {
    try {
      const user = await this._apiService.userInfo();
      this.ngemail = user.email
    } catch (error) {
      console.error("An error occurred while fetching user info:", error);
    }
    try {
      const profileData = await this._apiService.profileData();
      this.ngname = profileData.fullName;
      this.ngmobile = profileData.phoneNumber
      this.nggstin = profileData.gstn
      this.ngstate = profileData.state
      this.ngpincode = profileData.pincode
    }
    catch (error) {
      console.error("An error occurred while fetching user info:", error);
    }
  }

  onsubmit(form: NgForm) {
    try {
      const data = this._apiService.updatingProfileData(form.value);
    } catch (error) {
      alert(error);
    }
  }
}
