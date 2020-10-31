import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthsService} from 'src/app/service/auths.service';
import { SignUp } from 'src/app/models/auth-credential.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user = {
    fname : '',
    lname : '',
    email : '',
    password : '',
    cpassword : ''
  };
  submitted = false;
  signupStatus;
  constructor(private router : Router,
              private authService : AuthsService,
              private toast: ToastrService) { }

  ngOnInit(): void {
    this.authService.signupStatus$.subscribe(res =>{
      this.signupStatus = res;
      if(this.signupStatus === 200){
        this.router.navigate(['/signin']);
      }else if(this.signupStatus === 500){
        this.toast.error("Email Entered By You Already Exists", "Signup Failed", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-center'
        });
      }
    })
  }
  onSignin(){
    console.log("onSignin");
    this.router.navigate(['/signin']);
  }

  onSubmit(f : NgForm){
    console.log(f);
    
    this.submitted = true;
   

    const userData : SignUp = {
      fname : f.value.fname,
      lname : f.value.lname,
      email : f.value.email,
      password : f.value.password
    };

    this.authService.signUp(userData);
    
    f.reset();
    
  }

}
