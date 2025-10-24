import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../services/header.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthUser } from '../interface/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  userData : AuthUser = {
    email: '',
    name: '',
    role: ''
  }

  constructor(
    private headerService: HeaderService,
    private userService : UserService,
    private router : Router
  ) { }

  ngOnInit(): void {
    let token = this.userService.getTokenFromSessionStorage();
    if(!token){
      this.router.navigate(['/signIn'])
    }
    else{
      this.userData.name = token.name;
      this.userData.email = token.email;
      this.userData.role = token.role
    }
  }

  logOut() {
    const currUser = this.headerService.userLogged.value;
    if (currUser) {
      this.headerService.userLoggedOut();
    }
    else {
      alert("Can't logout Before Logging In")
    }
  }
}
