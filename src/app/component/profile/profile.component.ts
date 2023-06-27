import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { SignUPService } from 'src/app/Services/sign-up.service';
import { Router } from '@angular/router';
import { SharedService } from './shared/image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  onMobileInputChange(event: any) {
    this.ngmobile = event.target.value.replace(/\s/g, ''); // Remove spaces from input
    
  }
  isLoading:boolean=true;
  ngname: any = "";
  ngmobile: any = "";
  ngemail: any = "";
  ngstate: any = "";
  ngpincode: any = "";
  nggstin: any = "";
  profileData: any = "";
  image: any = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  ProfilePicture: FormData = new FormData();

  constructor(
    private _apiService: SignUPService,
    private _toastService: ToastService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getData();
    this.updateImage()

  }

  async getData() {
    this.isLoading= true; 
    try {
      const user = await this._apiService.userInfo();
      this.ngemail = user.email;
      this.profileData = await this._apiService.profileData();
      console.log("profileData", this.profileData);

      this.ngname = this.profileData.fullName;
      this.ngmobile = this.profileData.phoneNumber;
      this.nggstin = this.profileData.gstn;
      this.ngstate = this.profileData.state;
      this.ngpincode = this.profileData.pincode;

      if (this.profileData.profilePicture) {
        this.image = this.profileData.profilePicture;

      }
      this.sharedService.setImageSource(this.image)

    } catch (error) {
      console.error("An error occurred while fetching user info:", error);
    }
    this.isLoading= false
  }

  async onSubmit(form: NgForm) {
    const file = this.ProfilePicture.get('profilePicture');
    form.value["profilePicture"] = file;
    console.log(form.value);

    try {
      const data = await this._apiService.updatingProfileData(form.value);
      this.getData();
      this._toastService.success("Profile updated successfully");
      form.resetForm();
    } catch (error) {
      console.error("An error occurred while updating profile:", error);
      this._toastService.error("Failed to update profile");
    }

    this.ProfilePicture.delete("profilePicture")
  }

  onProfilePictureChange(event: any) {
    const file: File = event.target.files[0];
    this.ProfilePicture.append('profilePicture', file);
  }
  updateImage(): void {
    if (this.image) {
      console.log("working");
    }
  }
}
