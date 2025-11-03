import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentInterface } from '../interface/comment.interface';
import { Task } from '../interface/task.interface';
import { AuthUser } from '../interface/user.interface';
import { CommentService } from '../services/comment.service';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { CardService } from '../services/card.service';
import { Card, CardTask } from '../interface/card.interface';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent {
  projectTitle: string = "";
  userData !: AuthUser;
  // New Task for the Card 
  newTask: CardTask = {
    id: 0,
    taskName: '',
    assignedCard: ''
  }
  addTaskForm !: FormGroup;

  // Another list 
  newList: Card = {
    id: 0,
    title: '',
    wantedToAddCard: false,
    listOfTask: []
  }
  addAnotherList !: FormGroup;
  toggleAddList: boolean = false;
  /**
   * HERE IS THE NEW DECLARED VARIABLES FOR THE TRELLO STYLE BOARD CARDS
   */
  wantedToAddCard: boolean = true;
  cardList: Card[] = []

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private router: Router,
    private projectService: ProjectService,
    private commentService: CommentService,
    private cardService: CardService,
    private fb: FormBuilder
  ) {
    this.addTaskForm = this.fb.group({
      taskName: ["", Validators.required]
    })
    this.addAnotherList = this.fb.group({
      listName: ["", Validators.required]
    })
  }

  ngOnInit(): void {
    const token = this.userService.getTokenFromSessionStorage();
    if (!token) {
      this.router.navigate(['/signIn']);
    }
    else {
      this.userData = token;
    }

    this.cardService.cards$.subscribe(res => {
      this.cardList = res
      console.log("inside the card component cards --> ", this.cardList);
    })

  }

  submitTask(id: number, title: string) {
    if (this.addTaskForm.valid) {
      console.log(this.addTaskForm.value);
      const newTaskId = Date.now(); // unique per task
      this.newTask = {
        id: newTaskId,
        taskName: this.addTaskForm.value.taskName,
        assignedCard: title
      };
      this.cardList = this.cardList.map(t => {
        if (t.id === id) {
          return {
            ...t, listOfTask: [...(t.listOfTask || []), this.newTask]
          }
        }
        else {
          return t
        }
      })
      this.cardService.updatedCardList(this.cardList)
      this.addTaskForm.reset()
      this.toggleToAddCard(id);
    }
  }

  toggleToAddCard(index: number) {
    this.cardList = this.cardList.map(t => {
      if (t.id === index) {
        t.wantedToAddCard = !t.wantedToAddCard
        return t
      }
      else {
        return t
      }
    })
  }

  toggleAddAnotherList() {
    this.toggleAddList = !this.toggleAddList
  }
  submitList() {
    if (this.addAnotherList.valid) {
      console.log(this.addAnotherList.value);
      this.newList = {
        id: this.cardService.cardsLength$.value,
        title: this.addAnotherList.value.listName,
        wantedToAddCard: false,
        listOfTask: []
      }
      this.cardService.addAnotherCard(this.newList)
    }
    this.toggleAddList = !this.toggleAddList;
    this.addAnotherList.reset()
  }
}
