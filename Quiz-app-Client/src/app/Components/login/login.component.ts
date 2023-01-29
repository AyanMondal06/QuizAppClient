import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/Helpers/validateForm';
import { AuthService } from 'src/app/Services/auth.service';
import { QuizService } from 'src/app/Services/quiz.service';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  type: string = 'password';
  isText: boolean = false;
  iconShowHide:string='visibility';
  loginForm!:FormGroup;
  false:boolean=false;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private toast: NgToastService,
    public quizService: QuizService,
    private auth:AuthService,
    private user:UserService
  ) {}

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      Email:['',Validators.required],
      Password:['',Validators.required]
    })
  }
  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? (this.type = 'text') : (this.type = 'password');
    this.isText ? (this.iconShowHide='visibility_off')  : (this.iconShowHide='visibility');
  }
  GoToRegister() {
    this.route.navigate(['/register']);
  }
  OnSubmit(email: string, password: string) {
    if(this.loginForm.valid){
      this.auth.LoginRequest(email, password).subscribe({
        next:(data:any) => {
        this.auth.token = (data.data);
        console.log(data)
        localStorage.clear();
        this.auth.storeToken(data.data); 
        const tokenPayload=this.auth.decodedToken();
        this.user.setFullNameForStore(tokenPayload.name);
        this.user.setRolesForStore(tokenPayload.role);
        this.quizService.setQuizCompletedStatus('false');   
        this.route.navigate(['/dashbord']);
      },
        error:(err)=>{
          //this.toast.error({})
          //console.log(err);
        }
      })
  }else{
    ValidateForm.validateAllFormFields(this.loginForm);
    this.toast.error({detail:"ERROR!",summary:"Please fill up all details",duration:1000});
    
    //alert('invalid');
  }
  }
}
