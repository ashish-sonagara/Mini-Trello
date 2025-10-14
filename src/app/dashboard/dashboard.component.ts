import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../services/header.service';
import { UserService } from '../services/user.service';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskService } from '../services/task.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardSelectedItem: string = "board";

  constructor(
    private headerService: HeaderService,
    private userService: UserService,
    private taskService: TaskService,
    private projectService : ProjectService
  ) { }

  ngOnInit(): void {

    // call the storeTaskToSessionStorage method to store the inital task to session storage.
    this.taskService.storeTaskToSessionStorage();

    // cal the getCurrentlyLoggedInuser from userService to get the current user from the token.
    this.userService.getCurrentlyLoggedInuser();

    // calls the userLoggedIn method to check if the user is currently logged in or not. 
    this.headerService.userLoggedIn();

    // call the storeProjectToSessionStorage method to store the inital project to session storage.
    this.projectService.storeProjectToSessionStorage()
  }

  selectedItem(item: string) {
    this.dashboardSelectedItem = item;
  }

}   
