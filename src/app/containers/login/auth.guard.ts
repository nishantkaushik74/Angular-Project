import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LoginService } from 'src/app/Services/login.service';





@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private LoginService: LoginService, private router: Router) { }

  canActivate(): boolean {
    if (this.LoginService.isAuthenticated) {
      return true; // User is authenticated, allow access
    } else {
      this.router.navigate(['/login']); // User is not authenticated, redirect to login page
      return false;
    }


  }
}
