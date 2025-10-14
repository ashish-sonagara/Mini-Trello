import { Injectable } from "@angular/core";
import { Project } from "../interface/project.interface";
import { BehaviorSubject, combineLatest } from "rxjs";
import { TaskService } from "./task.service";
import { Task } from "../interface/task.interface";
import { UserService } from "./user.service";
// import {} from ""

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    private projects: Project[] = JSON.parse(sessionStorage.getItem('projects') || 'null') ?? [
        {
            id: 0,
            title: "Mini-Torello-Guide",
            imageURL: "../../assets/smaple1.png",
            assignedUserEmail: 'ashish@gmail.com'
        },
        {
            id: 1,
            title: "Another Project",
            imageURL: "../../assets/sample2.png",
            assignedUserEmail: 'ashish@gmail.com'
        },
        {
            id: 2,
            title: "Angular Project",
            imageURL: "../../assets/sample3.png",
            assignedUserEmail: 'ashish@gmail.com'
        },
        {
            id: 3,
            title: "React Project",
            imageURL: "../../assets/sample3.png",
            assignedUserEmail: 'jai@gmail.com'
        }
    ]

    projects$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(this.projects);
    projectId$: BehaviorSubject<number> = new BehaviorSubject<number>(this.projects$.value.length);

    // this project list will get the tasklist and store the task based on the project name.
    projectTaskList$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([])

    constructor(private taskService: TaskService, private userService: UserService) { }

    // First Projects Will be Stored in session storage 
    storeProjectToSessionStorage() {
        let projects = this.projects$.value;
        sessionStorage.setItem('projects', JSON.stringify(projects))
    }

    // This method is used to get the project from the Session Storage
    getProjectFromSessionStorage(email: string): Project[] {
        const data = sessionStorage.getItem('projects');
        if (data) {
            let projectList: Project[] = JSON.parse(data);
            // console.log("Inside getProjectFromSessionStorage-- ", projectList);

            projectList = projectList.filter(t => {
                return t.assignedUserEmail == email
            })

            return projectList
        }
        else {
            return [];
        }
    }

    // This method is used to get the TaskList based on the current project Opened
    getProjectTaskList(title: string) {
        combineLatest([this.taskService.tasks$, this.userService.currentUser$])
            .subscribe(([tasks, currUser]) => {
                if (!currUser) return;

                const projectTasks = tasks.filter(
                    t => t.assignedProject === title && t.assignedUserEmail === currUser.email
                );

                this.projectTaskList$.next(projectTasks);
            });
    }

    // This method is used to store new Project in Project$ subject and store the whole Project$ in Session Storage
    addProjectToSubject(newProject: Project) {
        let projectList: Project[] = [...this.projects$.value, newProject]
        if (projectList) {
            this.projects$.next(projectList);
            this.storeProjectToSessionStorage();
            this.projectId$.next(this.projects$.value.length);
            // console.log("After adding new Project --", this.projects$.value)
            // console.log("After adding new Project the length --", this.projects$.value.length)
        }
        else {
            console.error("Inside the addProjectToSubject-- was error!")
        }
    }

    // This method is used to delete the Project from Project$ subject and store the updated Project$ in Session Storage
    deleteProjectFromSubject(index: number) {
        let projectList: Project[] = this.projects$.value;
        if (projectList) {
            projectList.splice(index, 1);
            this.projects$.next(projectList);
            console.log(this.projects$.value)
            this.storeProjectToSessionStorage();
        }
    }


}