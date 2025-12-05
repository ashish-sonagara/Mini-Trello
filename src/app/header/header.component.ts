import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../services/header.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit {

  searchText: string = "";
  loggedIn : boolean  = false;
  showProfile : boolean = false;

  constructor(private header: HeaderService, private route: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.header.userLogged.subscribe(res => {
      this.loggedIn = res;
    })
  }


  loginButton(): void {
    const current = this.header.userLogged.value;
    console.log('Login button clicked. Current isHome ->', current);
    if (current) {
      alert('You are already logged in.');
    } else {
      this.route.navigate(['signIn']);
    }
  }

  // Logout() {
  //   const currUser = this.header.userLogged.value;
  //   if (currUser) {
  //     this.header.userLoggedOut();
  //   }
  //   else {
  //     alert("Can't logout Before Logging In")
  //   }
  // }

  showProfileComponent(){
    this.showProfile = !this.showProfile
  }


  searchedInput() {
    console.log(this.searchText);
    this.header.searchText.next(this.searchText);
  }

}
