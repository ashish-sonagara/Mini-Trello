import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../services/header.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private headerService : HeaderService, private userService : UserService){}

  ngOnInit(): void {
    let currUser = this.userService.currentUser$.value;
    if(currUser){
      this.headerService.userLoggedOut();
    }
  }
}
