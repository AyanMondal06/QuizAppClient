import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private route: Router, private toast: NgToastService) { }
  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.toast.error({ detail: "ERROR!", summary: "Please Login First!", duration: 1000 });
      this.route.navigate(['login']);
      return false;
    }
  }
}
