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
import { NgToastModule } from 'ng-angular-popup';
import { JwtTokenInterceptor } from './Interceptors/jwt-token.interceptor';
import { AdminDashbordComponent } from './Components/Admin/admin-dashbord/admin-dashbord.component';
import { DashbordComponent } from './Components/dashbord/dashbord.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEditPopupComponent } from './Components/Admin/add-edit-popup/add-edit-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    QuizComponent,
    ResultComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashbordComponent,
    DashbordComponent,
    AddEditPopupComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
