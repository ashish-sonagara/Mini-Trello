import { Injectable } from "@angular/core";
import { Card, CardTask } from "../interface/card.interface";
import { BehaviorSubject } from "rxjs";
import { ProjectService } from "./project.service";

@Injectable({
    providedIn: 'root'
})
export class CardService {

    constructor(
        private projectService: ProjectService
    ) {

    }

    updatedCardList(newCardList: Card[], projectTitle: string) {
        let projectList = this.projectService.projects$.value;
        projectList = projectList.map(project => {
            if (project.title === projectTitle) {
                return { ...project, cardList: newCardList }
            }
            return project
        })
        //  AFTER INSERTING CARDLIST TO SPECIFIC PROJECT AND UPDATING PROJECTLIST
        this.projectService.projects$.next(projectList)
        this.projectService.storeProjectToSessionStorage();
    }

}   