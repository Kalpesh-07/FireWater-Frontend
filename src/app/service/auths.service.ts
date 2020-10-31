import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SignUp, SignIn } from '../models/auth-credential.model';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthsService {

  private ServerURL = environment.SERVER_URL;
  user$ = new BehaviorSubject<object>(null);
  auth = false;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  loginmessage$ = new BehaviorSubject<string>(null);
  loginstatus$ = new BehaviorSubject<number>(0);
  signupStatus$ = new BehaviorSubject<number>(0);
  constructor(private httpClient : HttpClient,
              private toast : ToastrService) { }

  signUp(userData : SignUp){
    return this.httpClient.post(`${this.ServerURL}/auth/signup`, userData).subscribe(res =>{
    
      this.toast.success(`${userData.fname}, Your Account Created Successfully. Please Login to your account`, "Done", {
        timeOut: 2500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-full-width'
      })
      this.signupStatus$.next(200);
    }, error => {
      this.signupStatus$.next(error.status)
    })

    
  }

  signIn(userData : SignIn){
    return this.httpClient.post(`${this.ServerURL}/auth/signin`, userData) 
    .subscribe(res=>{
      let result = res.valueOf();
      let user = result['user'];
      
      if(user){
        this.auth = true;
        this.authState$.next(this.auth);
        this.loginmessage$.next("success");
        this.loginstatus$.next(200);
      }
  
      
      this.user$.next(user);
      
      
    
    },error =>{
      this.loginmessage$.next(error.error.message);
      this.loginstatus$.next(error.status);
      this.auth = false;
      this.authState$.next(this.auth);
    });
  }
}
