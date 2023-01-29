import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { QuizComponent } from './Components/quiz/quiz.component';
import { ResultComponent } from './Components/result/result.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizService } from './Services/quiz.service';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { CookieService } from 'ngx-cookie-service';
import { MatIconModule } from '@angular/material/icon'
import { NgToastModule } from 'ng-angular-popup';
import { JwtTokenInterceptor } from './Interceptors/jwt-token.interceptor';
import { AdminDashbordComponent } from './Components/Admin/admin-dashbord/admin-dashbord.component';
import { AddQuesComponent } from './Components/Admin/add-ques/add-ques.component';
import { EditQuesComponent } from './Components/Admin/edit-ques/edit-ques.component';
import { DashbordComponent } from './Components/dashbord/dashbord.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    QuizComponent,
    ResultComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashbordComponent,
    AddQuesComponent,
    EditQuesComponent,
    DashbordComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    NgToastModule,
    BrowserAnimationsModule
  ],
  providers: [QuizService, CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
