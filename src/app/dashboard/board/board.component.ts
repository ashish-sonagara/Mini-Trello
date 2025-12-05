import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Project } from 'src/app/interface/project.interface';
import { AuthUser, User } from 'src/app/interface/user.interface';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    standalone: false
})
export class BoardComponent implements OnInit {
  userData !: AuthUser;
  projectList: Project[] = [];

  project: Project = {
    id: 0,
    title: '',
    imageURL: '',
    assignedUserEmail: '',
    cardList: []
  }

  constructor(private userService: UserService, private route: Router, private projectService: ProjectService) { }

  ngOnInit(): void {
    const token = this.userService.getTokenFromSessionStorage();
    if (!token) {
      this.route.navigate(['/signIn']);
    }
    else {
      this.userData = token;
      if (this.userData) {
        // console.log("have used the gettoken method inside the board Component", this.userData);
      }
    }

    combineLatest(
      this.userService.currentUser$,
      this.projectService.projects$
    ).subscribe(([currUser, projects]) => {
      this.projectList = projects.filter(t => {
        return t.assignedUserEmail === currUser?.email
      })
      console.log("newly subscribed using the Projects$ behavioral subject ", this.projectList)
    })
  }

  onFormSubmission(form: NgForm) {
    if (form.valid) {
      console.log(" new project added --", form.value)
      let project: Project = {
        id: this.projectService.projectId$.value,
        title: form.value.title,
        assignedUserEmail: form.value.assignedUserEmail,
        imageURL: form.value.imageURL,
        cardList: [{
          id: 0,
          title: "To Do",
          wantedToAddCard: false,
          listOfTask: []
        },
        {
          id: 1,
          title: "Doing",
          wantedToAddCard: false,
          listOfTask: []
        },
        {
          id: 2,
          title: "Done",
          wantedToAddCard: false,
          listOfTask: []
        }
        ]
      };
      if (this.userData.role === 'Developer' || this.userData.role === 'Admin') {
        this.projectService.addProjectToSubject(project);
        form.reset()
      }
      else {
        alert("U dont have access To Assign project!")
        console.error("U dont have access To Assign project!")
      }
    }
  }

  deleteProject(index: number) {
    this.projectService.deleteProjectFromSubject(index);
  }

  goingToTheprojectPage(title: string) {
    sessionStorage.setItem('title', JSON.stringify(title));
  }

}
