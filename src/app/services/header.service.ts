import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { TaskService } from "./task.service";
import { Task } from "../interface/task.interface";

@Injectable({
    providedIn: 'root'
})
export class HeaderService {

    userLogged = new BehaviorSubject<boolean>(false);
    searchText = new BehaviorSubject<string>("")
    constructor(
        private userService: UserService,
        private router: Router,
        private taskService : TaskService,
    ) { }

    userLoggedIn() {
        let currUser = this.userService.currentUser$.value;
        if (currUser) {
            this.userLogged.next(true);
        }
        sessionStorage.setItem('userLoggedIn', JSON.stringify(this.userLogged));
    }

    userLoggedOut() {
        this.userService.deleteToken();
        this.router.navigate(['/home']);
        this.userLogged.next(false)
        sessionStorage.setItem('userLoggedIn', JSON.stringify(this.userLogged))
    }

    // isFiltering : boolean = true
    // filterTaskBasedOnTitle() : Task[]{
    //     console.log("inside the filtes taskl methd")
    //     let taskList : Task[] = [] 
    //     this.taskService.tasks$.subscribe(res => {
    //         taskList = res.filter( t => {
    //             return t.title === this.searchText.value
    //         })
    //     })
    //     return taskList
    // }   

}       