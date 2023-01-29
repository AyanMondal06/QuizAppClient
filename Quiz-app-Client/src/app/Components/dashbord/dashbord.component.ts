import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/Services/auth.service';
import { QuizComponent } from '../quiz/quiz.component';
import { QuizService } from 'src/app/Services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent {
  public fullName:string="";
  public role:string=""
constructor(
  private route:Router,
  private auth:AuthService,
  private user: UserService,
  private quizService:QuizService,
  ){}

ngOnInit(){
  this.user.getFullNameFromStore()
  .subscribe(val=>{
    let fullNameFromToken=this.auth.gefullNameFromToken();
    this.fullName= val|| fullNameFromToken;
  })
  this.user.getRoleFromStore()
  .subscribe(val=>{
    let roleFromToken=this.auth.getRoleFromToken();
    this.role=val || roleFromToken;
  })

}
takeQuizButton(){
  this.quizService.setQuizCompletedStatus('false');   
  this.route.navigate(['/quiz']);
}
}
