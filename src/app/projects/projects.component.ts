import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Task } from '../interface/task.interface';
import { AuthUser } from '../interface/user.interface';
import { combineLatest, fromEvent } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { NgForm } from '@angular/forms';
import { CommentInterface } from '../interface/comment.interface';
import { CommentService } from '../services/comment.service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
    standalone: false
})
export class ProjectsComponent implements OnInit {

  // @ViewChild('commentForm') commentForm: NgForm | undefined;

  projectTitle: string = "";
  userData !: AuthUser;
  projectBasedTaskList: Task[] = [];

  // Comment Parts 
  newComment: CommentInterface = {
    commentAuthor: '',
    date: new Date().toISOString(),
    description: ''
  }
  currentCommentTaskId: number | null = null;


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
      this.newComment.commentAuthor = this.userData.name
    }

    let title = sessionStorage.getItem('title');
    // if (title) {
    //   this.projectTitle = JSON.parse(title);
    //   this.projectService.getProjectTaskList(this.projectTitle);
    // }
    // // using the subject which is in the taskService 
    // this.projectService.projectTaskList$.subscribe(res => {
    //   this.projectBasedTaskList = res.map(task => {
    //     return { ...task, flipped: false, noComment: !task.comments || task.comments.length === 0 }    // if task is undefined or empty nocomments = true
    //   });

    // })
    console.log("inside the project component ---", this.projectBasedTaskList)
  }

  writeComments(taskId: number) {
    // console.log(taskId)
    this.projectBasedTaskList = this.projectBasedTaskList.map(task => {
      if (task.id == taskId) {
        // console.log(task)
        return { ...task, flipped: !task.flipped }
      }
      return task
    })
  }

  backToCardFront(taskId: number) {
    this.projectBasedTaskList = this.projectBasedTaskList.map(task => {
      if (task.id === taskId) {
        return { ...task, flipped: !task.flipped }
      }
      return task
    })
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

  openCommentModal(taskId: number) {
    this.currentCommentTaskId = taskId;
  }

  onCommentFormSubmission(form: NgForm) {
    // console.log(form.value)
    const commentToAdd: CommentInterface = {
      commentAuthor: form.value.commentAuthor,
      date: new Date().toISOString(),
      description: form.value.description
    };
    this.addCommentToTheTask(commentToAdd);

    form.resetForm({
      commentAuthor: '',
      date: new Date().toISOString(),
      description: ''
    });

    this.currentCommentTaskId = null;
  }

  addCommentToTheTask(newComment: CommentInterface) {
    this.projectBasedTaskList = this.projectBasedTaskList.map(task => {
      if (task.id === this.currentCommentTaskId) {
        const updatedComments = [...(task.comments || []), newComment];
        return {
          ...task,
          comments: updatedComments,
          noComment: updatedComments.length === 0 // ✅ check after adding
        };
      }
      return task
    })
    this.commentService.afterCommentAdded(this.projectBasedTaskList)
    // console.log(this.projectBasedTaskList ," int he add comment method")

  }

  deleteComment(commentIndex: number, taskId: number) {
    this.projectBasedTaskList = this.projectBasedTaskList.map(task => {
      if (task.id === taskId) {
        const updatedComments = [...(task.comments || [])];
        updatedComments.splice(commentIndex, 1); // remove by index
        return {
          ...task,
          comments: updatedComments,
          noComment: updatedComments.length === 0 // ✅ check after deletion
        };
      }
      return task;
    });
    this.commentService.afterCommentAdded(this.projectBasedTaskList)

  }
}
