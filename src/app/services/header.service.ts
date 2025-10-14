import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserService } from "./user.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class HeaderService {

    userLogged = new BehaviorSubject<boolean>(false);
    // isHome = new BehaviorSubject<boolean>(true);
    // userLogOut = new BehaviorSubject<boolean>(false);

    constructor(private userService: UserService , private router : Router) { }

    userLoggedIn() {
        let currUser = this.userService.currentUser$.value;
        if (currUser) {
            this.userLogged.next(true);
        }
    }

    userLoggedOut() {
        this.userService.deleteToken();
        this.router.navigate(['/home']);
        this.userLogged.next(false)
    }

}       