import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { CookieService } from 'ngx-cookie-service';
import { QuizService } from 'src/app/Services/quiz.service';


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
    public quizService: QuizService,
    private route: Router,
    private toast: NgToastService
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
      this.quizService.LoginRequest(email, password).subscribe((data: any) => {
      this.quizService.token = data.data;
      localStorage.clear();
      this.quizService.storeToken(data.data); 
      this.quizService.setQuizCompletedStatus('false');   
      this.route.navigate(['/quiz']);
    
    },
    );
  }else{
    this.validateAllFormFields(this.loginForm);
    this.toast.error({detail:"ERROR!",summary:"Please fill up all details",duration:1000});
    
    //alert('invalid');
  }
  }
  private validateAllFormFields(formGrop:FormGroup){
    Object.keys(formGrop.controls).forEach(field=>{
      const control =formGrop.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }
}
