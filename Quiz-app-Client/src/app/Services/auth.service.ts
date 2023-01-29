import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { QuizService } from './quiz.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private cookieService: CookieService,
    private quizService: QuizService,
    private route:Router,
    private http:HttpClient 
    ) 
  {
    this.userPayload=this.decodedToken();
  }
  
  readonly rootUrl=environment.rootUrl;
  token?:string;
  private userPayload:any;

  LoginRequest(email:string,password:string){
    var body={
      email:email,
      password:password
    }
    return this.http.post(this.rootUrl+ '/Auth/Login',body);
  }
  storeToken(JwtToken:string){
    this.cookieService.set('JwtToken', JwtToken);
  }
  getToken(){
    return this.cookieService.get('JwtToken');
  }
  decodedToken(){
    const JwtHelper=new JwtHelperService();
    const token=this.getToken()!;
    console.log(JwtHelper.decodeToken(token));
    return JwtHelper.decodeToken(token);
  }
  gefullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }
  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }
  isLoggedIn():boolean{
    return !!this.cookieService.get('JwtToken');
  }
  logOut(){
    this.cookieService.deleteAll();
    //this.quizService.interval_.unsubscribe();
    localStorage.clear();
    this.quizService.resetQuiz();
    this.route.navigate(['']);
  }
}
