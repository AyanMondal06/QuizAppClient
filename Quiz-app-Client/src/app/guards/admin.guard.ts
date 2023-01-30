import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/user.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private user: UserService, private route: Router, private toast: NgToastService, private auth: AuthService) { }

  public role: string = ""

  canActivate(): boolean {
    this.user.getRoleFromStore()
      .subscribe(val => {
        let roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;
      })
    if (this.role == 'Admin') {
      return true;
    } else {
      this.toast.error({ detail: "ERROR!", summary: "Please Login As An Admin First!", duration: 2000 });
      this.route.navigate(['login']);
      return false;
    }
  }

}
