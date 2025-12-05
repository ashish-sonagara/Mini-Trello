import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Task } from 'src/app/interface/task.interface';
import { AuthUser, User } from 'src/app/interface/user.interface';
import { HeaderService } from 'src/app/services/header.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
    standalone: false
})
export class TaskComponent implements OnInit {

  userData !: AuthUser;
  taskList: Task[] = [];
  // id !: number;

  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    status: '',
    assignedUserEmail: '',
    imageURL: '',
    assignedProject: ''
  }

  constructor(
    private taskService: TaskService, 
    private userService: UserService, 
    private router: Router,
    private headerService : HeaderService
  ) { }

  ngOnInit(): void {
    const token = this.userService.getTokenFromSessionStorage();
    if (!token) {
      this.router.navigate(['/signIn']);
    }
    else {
      this.userData = token;
    }

    combineLatest([
      this.taskService.tasks$,
      this.userService.currentUser$
    ]).subscribe(([tasks, currUser]) => {
      this.taskList = tasks.filter(t => {
        return t.assignedUserEmail === currUser?.email;
      })
      console.log("newly subscribed using the task$ behavioral subject ", this.taskList)
    })
  }

  // onFormSubmission(form : NgForm){
  //   if(form.valid){
  //     console.log(form.value);
  //     let newTask : Task= {
  //       id: this.taskService.taskId.value,
  //       title: form.value.title,
  //       description: form.value.description,
  //       status: form.value.status,
  //       assignedUserEmail: form.value.assignedUserEmail,
  //       assignedProject: form.value.assignProject,
  //       imageURL: form.value.imageURL
  //     };
  //     this.taskService.addTaskToSubject(newTask);
  //   }
  // }

  redirectToTaskform(){
    this.router.navigate(['/taskForm']);
  }

  deleteTask(index: number) {
    this.taskService.deleteTaskFromSubject(index)
  }

  editCurrentTask(index : number){
    this.taskService.editCurrentTask(index)
  }
}
