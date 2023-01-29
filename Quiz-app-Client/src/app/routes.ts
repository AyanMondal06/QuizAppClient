import {Routes} from '@angular/router'
import { QuizComponent } from './Components/quiz/quiz.component';
import { ResultComponent } from './Components/result/result.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ResultGuard } from './guards/result.guard';
import { DashbordComponent } from './Components/dashbord/dashbord.component';
import { AdminDashbordComponent } from './Components/Admin/admin-dashbord/admin-dashbord.component';

export const appRoutes: Routes=[
    //{path:'quiz',component:QuizComponent,canActivate:[AuthGuard]},
    {path:'',redirectTo:'dashbord',pathMatch:'full'},
    {path:'dashbord',component:DashbordComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'quiz',component:QuizComponent,canActivate:[AuthGuard,ResultGuard]},
    {path:'result',component:ResultComponent,canActivate:[AuthGuard]},
    {path:'admin',component:AdminDashbordComponent,canActivate:[AuthGuard]}
    
];