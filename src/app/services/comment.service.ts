import { Injectable } from "@angular/core";
import { CommentInterface } from "../interface/comment.interface";
import { BehaviorSubject } from "rxjs";
import { ProjectService } from "./project.service";
import { UserService } from "./user.service";
import { TaskService } from "./task.service";
import { Task } from "../interface/task.interface";

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    // private commentList: CommentInterface[] = [];

    // commentList$: BehaviorSubject<CommentInterface[]> = new BehaviorSubject<CommentInterface[]>(this.commentList);

    constructor(
        private projectService: ProjectService,
        private UserService: UserService,
        private taskService: TaskService
    ) { }

    afterCommentAdded(newProjectTaskList: Task[]) {
        this.projectService.projectTaskList$.next(newProjectTaskList);

        const taskList = this.taskService.tasks$.value.map(task => {
            const updatedTask = newProjectTaskList.find(pt => pt.id === task.id);
            return updatedTask ? updatedTask : task;
        });

        this.taskService.tasks$.next(taskList); // ✅ push updated list
        this.taskService.storeTaskToSessionStorage()
    }

}   