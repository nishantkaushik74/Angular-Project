import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { LoginService } from '../../../Services/login.service';
import { Router } from '@angular/router';


import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService, private loginService: LoginService, private router: Router) {
    super();
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