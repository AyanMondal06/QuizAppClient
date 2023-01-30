import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { QuizService } from '../Services/quiz.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class ResultGuard implements CanActivate {
  constructor(private quizService: QuizService, private route: Router, private toast: NgToastService) { }
  canActivate(): boolean {
    if (this.quizService.isQuizCompleatedStatus()) {
      this.route.navigate(['result']);
      return false;
    } else {
      return true;

    }
  }
}
