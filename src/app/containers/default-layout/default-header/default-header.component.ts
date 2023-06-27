import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { LoginService } from '../../../Services/login.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../../app/component/profile/shared/image.service';
import { Subscription } from 'rxjs';

import { NgForm } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { SignUPService } from 'src/app/Services/sign-up.service';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnDestroy {
  public imageSrc: any;
  private subscription: Subscription;
  image: any="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  profileData: any;
  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(
    private classToggler: ClassToggleService,
    private loginService: LoginService,
    private router: Router,
    private sharedService: SharedService,
    private _apiService: SignUPService,

  ) {
    super();
    this.subscription = this.sharedService.image$.subscribe(
      (imageUrl: string) => {
        this.imageSrc = imageUrl;
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.getData();


  }
  async getData() {
    try {
      const user = await this._apiService.userInfo();

      this.profileData = await this._apiService.profileData();
      if (this.profileData.profilePicture) {
        this.image = this.profileData.profilePicture;

      }
      console.log("🚀 ~ file: default-h:", this.image)
    } catch (error) {
      // console.error("An error occurred while fetching user info:", error);
    }
  }
  logout() {
    try {
      this.loginService.logout().then(({ error }) => {
        if (error) {
          console.log(error);
          alert('An error occurred during logout');
        } else {
          // Clear the stored token and any other necessary data
          localStorage.removeItem('token');
          localStorage.removeItem('data');
          localStorage.removeItem('user');
          localStorage.removeItem('userinformation');
          localStorage.removeItem('userRole');
          localStorage.removeItem('questionId');
          // Reset the authentication state
          this.loginService.isAuthenticated = false;
          // Redirect to the login page
          this.router.navigate(['/login']);
        }
      });
    } catch (error) {
      console.log(error);
      alert('An error occurred during logout');
    }
  }
}  
