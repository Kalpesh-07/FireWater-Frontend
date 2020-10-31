import { Component, OnInit } from '@angular/core';
import { AuthsService } from 'src/app/service/auths.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService : AuthsService) { }
  user;

  ngOnInit(): void {
    this.authService.user$.subscribe(user => { this.user = user; console.log(user);})
  }

  logout(){
    console.log('logout');
    
  }

}
