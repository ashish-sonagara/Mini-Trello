import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderService } from '../services/header.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private headerService: HeaderService, private userService: UserService) { }

  ngOnInit(): void {
    let currUser = this.userService.currentUser$.value;
    if (currUser) {
      this.headerService.userLoggedOut();
    }
  }

  ngAfterViewInit(): void {
    // let vid : HTMLVideoElement | null = document.querySelector('.img-fluid')
    // setTimeout(() => {
    //   if(vid) {
    //     vid.play()
    //   }
    // }, 1200);
  }

}
