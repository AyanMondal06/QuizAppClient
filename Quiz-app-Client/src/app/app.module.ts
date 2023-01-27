import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { QuizComponent } from './Components/quiz/quiz.component';
import { ResultComponent } from './Components/result/result.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { QuizService } from './Services/quiz.service';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { CookieService } from 'ngx-cookie-service';
import {MatIconModule} from '@angular/material/icon'
import {NgToastModule} from 'ng-angular-popup';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    QuizComponent,
    ResultComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    NgToastModule
  ],
  providers: [QuizService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
