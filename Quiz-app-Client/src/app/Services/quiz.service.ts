import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class QuizService {

  readonly quizTime=4400;
  readonly rootUrl=environment.rootUrl;
  noOfQns:number=5;
  qns: any[]=[];
  seconds=this.quizTime;
  interval_:any;
  currentQuestion: number=0;
  // isQuizCompleated:boolean=false;
  correctAnswerCount: number = 0;
  flag:boolean=true;


  constructor(private http: HttpClient, 
    private route: Router,
    private cookieService: CookieService
    ) {
   
   }

  get5Questions() {
    return this.http.get(this.rootUrl + '/Question/Fetch5Que');
  }
  getAnswers() {
    var body = this.qns.map(x => x.questionId);
    return this.http.post(this.rootUrl + '/Question/getAnswers', body);
  } 

  RegisterRequest(email:string,name:string,password:string){
    var body={
      email:email,
      name:name,
      password:password,
    }
    return this.http.post(this.rootUrl+ '/Auth/Register',body);
  }
  
  getQuizCompletedStatus(){
    return localStorage.getItem('QuizCompleteIndicator');
  }
  setQuizCompletedStatus(status:string){
    localStorage.setItem('QuizCompleteIndicator',status);
  }
  isQuizCompleatedStatus():boolean{
    var a=localStorage.getItem('QuizCompleteIndicator');
     return a==this.flag.toString();
    
  }
  resetQuiz(){
    this.qns =[];
    this.seconds=this.quizTime;
    this.currentQuestion=0;
    if(this.interval_)
    this.interval_.unsubscribe();
  }
}
