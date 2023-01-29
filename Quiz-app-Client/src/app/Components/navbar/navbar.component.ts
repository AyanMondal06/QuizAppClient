import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
constructor(
  private auth:AuthService,
  private route:Router,
  private user:UserService
  ){}

  public isLoggedIn:boolean=this.auth.isLoggedIn();
  public fullName:string="";
  public role:string=""

isQuizCompleted:boolean=localStorage.getItem('QuizCompleteIndicator')=='true';
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
registerButton(){
  this.route.navigate(['/register']);
}
logInButton(){
  //this.isLoggedIn=true
  this.route.navigate(['/login']);

}
logOutButton(){
  this.auth.logOut();
  this.isLoggedIn=false;
  this.route.navigate(['dashbord']);
 
}
dashbordButton(){
  this.route.navigate(['dashbord']);
}
AdminDashbordButton(){
  if(this.role=='Admin')
  this.route.navigate(['admin']);
}
}
