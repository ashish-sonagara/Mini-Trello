import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserService } from "./user.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class HeaderService {

    userLogged = new BehaviorSubject<boolean>(false);
    // searchText = new BehaviorSubject<string>("")

    constructor(private userService: UserService , private router : Router) { }

    userLoggedIn() {
        let currUser = this.userService.currentUser$.value;
        if (currUser) {
            this.userLogged.next(true);
        }
        sessionStorage.setItem('userLoggedIn' , JSON.stringify(this.userLogged));
    }

    userLoggedOut() {
        this.userService.deleteToken();
        this.router.navigate(['/home']);
        this.userLogged.next(false)
        sessionStorage.setItem('userLoggedIn' , JSON.stringify(this.userLogged))
    }

}       