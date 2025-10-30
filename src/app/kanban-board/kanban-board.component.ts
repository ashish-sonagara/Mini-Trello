import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentInterface } from '../interface/comment.interface';
import { Task } from '../interface/task.interface';
import { AuthUser } from '../interface/user.interface';
import { CommentService } from '../services/comment.service';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent {
  projectTitle: string = "";
  userData !: AuthUser;
  projectBasedTaskList: Task[] = [];
  
  currentCommentTaskId: number | null = null;
  wantedToAddCard : boolean = true;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private router: Router,
    private projectService: ProjectService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    const token = this.userService.getTokenFromSessionStorage();
    if (!token) {
      this.router.navigate(['/signIn']);
    }
    else {
      this.userData = token;
      // this.newComment.commentAuthor = this.userData.name
    }

    let title = sessionStorage.getItem('title');
    if (title) {
      this.projectTitle = JSON.parse(title);
      this.projectService.getProjectTaskList(this.projectTitle);
    }
    // using the subject which is in the taskService 
    this.projectService.projectTaskList$.subscribe(res => {
      this.projectBasedTaskList = res.map(task => {
        return { ...task, flipped: false, noComment: !task.comments || task.comments.length === 0 }    // if task is undefined or empty nocomments = true
      });

    })
    console.log("inside the project component ---", this.projectBasedTaskList)
  }

  redirectToTaskform() {
    this.router.navigate(['/taskForm']);
  }

  deleteTask(index: number) {
    this.taskService.deleteTaskFromSubject(index);
  }

  taskCompleted(index: number) {
    this.taskService.taskCompleted(index);
  }

  editCurrentTask(index: number) {
    this.taskService.editCurrentTask(index)
  }

  toggleToAddCard(){
    this.wantedToAddCard = !this.wantedToAddCard
  }

}
