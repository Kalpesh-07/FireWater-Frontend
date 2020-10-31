import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SignIn } from 'src/app/models/auth-credential.model';
import { AuthsService } from 'src/app/service/auths.service';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  // @ViewChild('f') signupform : NgForm;
  user = {
    email : '',
    password : ''
  };
  submitted = false;
  loginMessage;
  loginstatus;
  constructor(private router : Router,
              private authService : AuthsService,
              private toast: ToastrService) { }

  ngOnInit(): void {
    this.authService.loginmessage$.subscribe(res =>{
      console.log(res);
      
      this.loginMessage = res;
    });


    this.authService.loginstatus$.subscribe(res =>{
      this.loginstatus = res;
      if(this.loginstatus === 401){
          this.toast.error(`${this.loginMessage}`, "Login Failed", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-center'
        })
      }else if(this.loginstatus === 400){
          this.toast.error(`${this.loginMessage}`, "Login Failed", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-center'
        })
      }else if(this.loginstatus === 200){
            this.toast.success("You have Successfully Logged in", "Login Success", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-center'
          })
      }
    })
  }
  onSignup(){
    console.log("onSignup called");
    this.router.navigate(['/signup']);
    
  }

  onSubmit(f : NgForm){
    
    this.submitted = true;
    const userData : SignIn = {
      email : f.value.email,
      password : f.value.password
    }
    let res =  this.authService.signIn(userData);
    console.log(res);
    
    f.reset();
  }

}

