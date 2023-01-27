import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { QuizService } from 'src/app/Services/quiz.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  type: string = 'password';
  isText: boolean = false;
  iconShowHide: string = 'visibility';
  RegisterForm!: FormGroup;

  constructor(public quizService: QuizService, private route: Router,private toast: NgToastService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      Email: ['',Validators.required],
      Name: ['',Validators.required],
      Password:['',Validators.required]
    })
  }

  GoToLogin() {
    this.route.navigate(['/login']);
  }
  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? (this.type = 'text') : (this.type = 'password');
    this.isText ? (this.iconShowHide = 'visibility_off') : (this.iconShowHide = 'visibility');
  }

  OnSubmit(Email: string, Name: string, Password: string) {
    if(this.RegisterForm.valid){
    this.quizService.RegisterRequest(Email, Name, Password).subscribe(
      () => {
        this.route.navigate(['/login']);
      }
    )}else{
      this.validateAllFormFields(this.RegisterForm);
      this.toast.error({detail:"ERROR!",summary:"Please fill up all details",duration:1000});
    }
  }
  private validateAllFormFields(formGrop: FormGroup) {
    Object.keys(formGrop.controls).forEach(field => {
      const control = formGrop.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control)
      }
    })
  }
}
