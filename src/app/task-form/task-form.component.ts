import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { NgForm } from '@angular/forms';
import { Task } from '../interface/task.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../services/navigatio.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  isediting: boolean = false;

  newTask: Task = {
    id: 0,
    imageURL: '',
    title: '',
    description: '',
    status: '',
    assignedUserEmail: '',
    assignedProject: ''
  }


  constructor(
    private taskService: TaskService,
    private router: Router,
    // private location : Location,
    private navigationService: NavigationService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const taskId = this.activatedRoute.snapshot.queryParamMap.get('id');
    console.log(taskId);
    const task = this.taskService.tasks$.value.filter(t => {
      return t.id === Number(taskId)
    })
    if (task) {
      console.log("task i got matches the id", task);
      this.newTask = task[0]
      this.isediting = true;
    }
  }

  onFormSubmission(form: NgForm) {
    let idToUse: number;
    if (this.isediting) {
      idToUse = this.newTask.id; // keep existing id
    } else {
      idToUse = this.taskService.taskId.value; // new id for add
    }
    if (form.valid) {
      console.log(form.value);
      let newTask: Task = {
        id: idToUse,
        title: form.value.title,
        description: form.value.description,
        status: form.value.status,
        assignedUserEmail: form.value.assignedUserEmail,
        assignedProject: form.value.assignProject,
        imageURL: form.value.imageURL
      };
      this.taskService.addTaskToSubject(newTask);
      this.navigationService.goBackToPreviosUrl();
    }
    form.reset()
  }

  goBack() {
    this.navigationService.goBackToPreviosUrl()
  }
}
