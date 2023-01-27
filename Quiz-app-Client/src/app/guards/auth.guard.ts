import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizService } from '../Services/quiz.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 constructor(private quizService:QuizService,private route:Router,private toast:NgToastService){}
  canActivate():boolean{
    if(this.quizService.isLoggedIn()){
      return true;
    }else{
      this.toast.error({detail:"ERROR!",summary:"Please Login First!",duration:1000});
      this.route.navigate(['login']);
      return false;
    }
  }
}
