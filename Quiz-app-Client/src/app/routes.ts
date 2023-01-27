import {Routes} from '@angular/router'
import { QuizComponent } from './Components/quiz/quiz.component';
import { ResultComponent } from './Components/result/result.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ResultGuard } from './guards/result.guard';

export const appRoutes: Routes=[
    //{path:'quiz',component:QuizComponent,canActivate:[AuthGuard]},
    {path:'quiz',component:QuizComponent,canActivate:[AuthGuard,ResultGuard]},
    {path:'result',component:ResultComponent,canActivate:[AuthGuard]},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'',redirectTo:'login',pathMatch:'full'}
];