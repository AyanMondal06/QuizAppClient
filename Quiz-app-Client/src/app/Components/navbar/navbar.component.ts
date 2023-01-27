import { Component } from '@angular/core';
import { QuizService } from 'src/app/Services/quiz.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
constructor(public quizService:QuizService){}
logOutButton(){
  this.quizService.logOut();
}
}
