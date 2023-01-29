import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(
    private auth:AuthService,
    private toast:NgToastService,
    private route:Router
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const JwtToken =this.auth.getToken();

    if(JwtToken){
      request=request.clone({
        setHeaders:{Authorization:`bearer ${JwtToken}`}
        
      })
    }
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status==400){
            let summary_=err.error.message
            this.toast.warning({detail:'Warning!',summary:summary_,duration:2000})
          }
          if(err.status==401){
            this.toast.warning({detail:"Warning!",summary:"Please login again!"});
            this.route.navigate(['login'])
          }
        }
        return throwError(()=> new Error("Some other Error Occured"))
      })
    );
  }
}
