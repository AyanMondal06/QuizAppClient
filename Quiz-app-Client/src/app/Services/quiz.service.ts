import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quizTime=300;
  readonly rootUrl=environment.rootUrl;
  noOfQns:number=5;
  qns: any[]=[];
  seconds=this.quizTime;
  interval_:any;
  currentQuestion: number=0;
  // isQuizCompleated:boolean=false;
  correctAnswerCount: number = 0;
  token?:string;
  flag:boolean=true;

  constructor(private http: HttpClient,private cookieService: CookieService, private route: Router) { }

  get5Questions() {
    return this.http.get(this.rootUrl + '/Question/Fetch5Que');
  }
  getAnswers() {
    var body = this.qns.map(x => x.questionId);
    return this.http.post(this.rootUrl + '/Question/getAnswers', body);
  } 
  LoginRequest(email:string,password:string){
    var body={
      email:email,
      password:password
    }
    return this.http.post(this.rootUrl+ '/Auth/Login',body);
  }
  RegisterRequest(email:string,name:string,password:string){
    var body={
      email:email,
      name:name,
      password:password,
    }
    return this.http.post(this.rootUrl+ '/Auth/Register',body);
  }
  storeToken(JwtToken:string){
    this.cookieService.set('JwtToken', JwtToken);
  }
  getToken(){
    return this.cookieService.get('JwtToken');
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
  isLoggedIn():boolean{
    return !!this.cookieService.get('JwtToken');
  }
  resetQuiz(){
    this.qns =[];
    this.seconds=this.quizTime;
  }
  logOut(){
    this.cookieService.deleteAll();
    this.interval_.unsubscribe();
    localStorage.clear();
    this.resetQuiz();
    this.route.navigate(['']);
  }
}
