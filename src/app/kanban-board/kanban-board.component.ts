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
  editTaskForm !: FormGroup;
  newCardId: number = 0

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

    this.editTaskForm = this.fb.group({
      editTaskName: ["", Validators.required]
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

    const encryptTitle = sessionStorage.getItem('title');
    if (encryptTitle) {
      this.projectTitle = JSON.parse(encryptTitle)
    }
    this.projectService.projects$.subscribe(res => {
      // console.log("inside the kanban component ", res)
      let project = res.find(t => {
        return t.title === this.projectTitle
      })
      if (project) {
        this.cardList = project.cardList;
        // console.log("this is the current project title " , this.projectTitle , "and this is the data" , project.cardList)
        this.newCardId = project.cardList.length
      }
    })
  }

  submitTask(id: number, title: string) {
    if (this.addTaskForm.valid) {
      // console.log(this.addTaskForm.value);
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
      this.cardService.updatedCardList(this.cardList, this.projectTitle)
      this.addTaskForm.reset()
      this.toggleToAddCard(id);
    }
  }

  editOldTask(taskId: number, cardId: number, title: string) {
    if (this.editTaskForm.valid) {
      console.log(this.editTaskForm.value)

      this.cardList = this.cardList.map(card => {
        if (card.id !== cardId) return card

        return {
          ...card, listOfTask: card.listOfTask.map(task =>
            task.id == taskId ? { ...task, taskName: this.editTaskForm.value.editTaskName, isEditing: !task.isEditing } : task
          )
        }
      })
      this.cardService.updatedCardList(this.cardList, this.projectTitle)
      this.addTaskForm.reset()
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
      // console.log(this.addAnotherList.value);
      this.newList = {
        id: this.newCardId,
        title: this.addAnotherList.value.listName,
        wantedToAddCard: false,
        listOfTask: []
      }
      this.cardList = [...this.cardList, this.newList]
      this.cardService.updatedCardList(this.cardList, this.projectTitle)
    }
    this.toggleAddList = !this.toggleAddList;
    this.addAnotherList.reset()
  }

  editTheTask(taskId: number, cardId: number) {
    console.log("inside the editTask method")
    this.cardList = this.cardList.map(card => {
      if (card.id !== cardId) return card

      return {
        ...card, listOfTask: card.listOfTask.map(task =>
          task.id === taskId ? { ...task, isEditing: !(task.isEditing ?? false) } : task
        )
      }
    })
    console.log(this.cardList)
  }

  updateInput(event: Event, taskId: number, cardId: number) {
    const value = (event.target as HTMLInputElement).checked;
    this.cardList = this.cardList.map(card => {
      if (card.id !== cardId) return card

      return {
        ...card,
        listOfTask: card.listOfTask.map(task =>
          task.id === taskId ? { ...task, checked: value } : task
        )
      }
    })
  }

  changeMoreOptions(index: number) {
    // console.log("clicked ont the more options" , index)
    this.cardList = this.cardList.map(card => {
      if (card.id === index) {
        return {
          ...card, viewMoreOptions: !(card.viewMoreOptions ?? false)
        }
      }
      else {
        return card
      }
    })
  }
}
