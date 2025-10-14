import { Injectable } from "@angular/core";
import { Task } from "../interface/task.interface";
import { User } from "../interface/user.interface";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks: Task[] = JSON.parse(sessionStorage.getItem('tasks') || 'null')
        ?? [{
            id: 0,
            imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcTY50AnR35-aKaONIPoeLNh_KrvAq9bwD7A&s",
            title: "Go To College",
            description: "Have to go to college on Saturday to collect the pass and submit the manual.",
            status: "overdue",
            assignedUserEmail: "ashish@gmail.com",
            assignedProject: "Angular Project"
        },
        {
            id: 1,
            imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcTY50AnR35-aKaONIPoeLNh_KrvAq9bwD7A&s",
            title: "Sleep by 9",
            description: "Today I have to sleep by 9 pm to get a perfect and healthy sleep.",
            status: "inProgress",
            assignedUserEmail: "jai@gmail.com",
            assignedProject: "Angular Project"

        },
        {
            id: 2,
            imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcTY50AnR35-aKaONIPoeLNh_KrvAq9bwD7A&s",
            title: "Complete the Manual",
            description: "By Saturday I have to complete all the manuals so that I can submit on time.",
            status: "completed",
            assignedUserEmail: "ashish@gmail.com",
            assignedProject: "Another Project"

        },
        {
            id: 3,
            imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcTY50AnR35-aKaONIPoeLNh_KrvAq9bwD7A&s",
            title: "Complete Today's Task",
            description: "By 6 pm I have to complete the assigned task to get good marks.",
            status: "inProgress",
            assignedUserEmail: "jai@gmail.com",
            assignedProject: "Angular Project"

        },
        {
            id: 4,
            imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcTY50AnR35-aKaONIPoeLNh_KrvAq9bwD7A&s",
            title: "Prepare Presentation",
            description: "Make slides for the upcoming project presentation scheduled for Monday.",
            status: "inProgress",
            assignedUserEmail: "ashish@gmail.com",
            assignedProject: "Another Project"

        },
        {
            id: 5,
            imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcTY50AnR35-aKaONIPoeLNh_KrvAq9bwD7A&s",
            title: "Buy Stationery",
            description: "Purchase pens, notebooks, and folders for the next semester.",
            status: "overdue",
            assignedUserEmail: "jai@gmail.com",
            assignedProject: "Mini-Torello-Guide"

        },
        {
            id: 6,
            imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcTY50AnR35-aKaONIPoeLNh_KrvAq9bwD7A&s",
            title: "Finish Angular Assignment",
            description: "Complete the Angular assignment and upload it to the portal before Friday.",
            status: "inProgress",
            assignedUserEmail: "ashish@gmail.com",
            assignedProject: "Angular Project"

        },
        {
            id: 7,
            imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcTY50AnR35-aKaONIPoeLNh_KrvAq9bwD7A&s",
            title: "Gym Workout",
            description: "Go to the gym and complete a 1-hour strength training session.",
            status: "completed",
            assignedUserEmail: "jai@gmail.com",
            assignedProject: "Another Project"

        },
        {
            id: 8,
            imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcTY50AnR35-aKaONIPoeLNh_KrvAq9bwD7A&s",
            title: "Update Resume",
            description: "Update the resume with the latest project details and achievements.",
            status: "inProgress",
            assignedUserEmail: "ashish@gmail.com",
            assignedProject: "Angular Project"

        },
        {
            id: 9,
            imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcTY50AnR35-aKaONIPoeLNh_KrvAq9bwD7A&s",
            title: "Plan Weekend Trip",
            description: "Finalize the plan for the weekend trip with friends and book tickets.",
            status: "overdue",
            assignedUserEmail: "ashish@gmail.com",
            assignedProject: "Mini-Torello-Guide"
        }];

    tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.tasks);
    taskId: BehaviorSubject<number> = new BehaviorSubject<number>(this.tasks$.value.length)

    constructor(
        private router: Router,
    ) { }

    // storeTaskToSessionStorage(task : Task) {
    storeTaskToSessionStorage() {
        let taskList = this.tasks$.value;
        console.log("this is the first time adding task to the session storage", taskList)
        sessionStorage.setItem('tasks', JSON.stringify(taskList));
    }

    getAssignedTaskFromSessionStorage(email: string): Task[] {
        const data = sessionStorage.getItem('tasks');
        if (data) {
            let taskList: Task[] = JSON.parse(data);
            // console.log("Inside getAssignedTaskFromSessionStorage -- ", taskList);

            taskList = taskList.filter(t => {
                return t.assignedUserEmail === email;
            })

            return taskList;
        }
        else {
            return [];
        }
    }

    addTaskToSubject(newTask: Task) {
        let oldTaskList: Task[] | null = this.tasks$.value;
        if (oldTaskList) {
            let edit: boolean = false
            let taskList = oldTaskList.map(t => {
                if (t.id === newTask.id) {
                    edit = true
                    return newTask
                }
                else {
                    return t
                }
            })
            if (!edit) {
                taskList = [...taskList, newTask];
            }
            this.tasks$.next(taskList);
            this.storeTaskToSessionStorage();
            if (!edit) {
                this.taskId.next(this.tasks$.value.length);
            }
        }

        // if (oldTaskList) {
        //     oldTaskList.forEach(task => {
        //         if (task.id === newTask.id) {
        //             let taskList = oldTaskList.filter(t => {
        //                 return t.id !== newTask.id
        //             })
        //             taskList = [...taskList, newTask]
        //             this.tasks$.next(taskList);
        //             this.storeTaskToSessionStorage();
        //             this.taskId.next(this.tasks$.value.length);
        //         }
        //         else {
        //             let taskList = [...oldTaskList, newTask];
        //             this.tasks$.next(taskList);
        //             this.storeTaskToSessionStorage();
        //             this.taskId.next(this.tasks$.value.length);
        //         }
        //     })
        // }
    }

    deleteTaskFromSubject(taskId: number) {
        const taskList = this.tasks$.value.filter(res => {
            return taskId != res.id
        })
        this.tasks$.next(taskList);
        this.storeTaskToSessionStorage();
    }

    taskCompleted(taskId: number) {
        const taskList: Task[] | null = this.tasks$.value;
        if (taskList) {
            // Update task status immutably
            const updatedTaskList = taskList.map(task => {
                if (task.id === taskId) {
                    return { ...task, status: 'completed' as const };
                }
                return task;
            });

            this.tasks$.next(updatedTaskList);
            this.storeTaskToSessionStorage();
        }
        else {
            console.error("Inside the taskCompleted method -- was error!")
        }
    }

    editCurrentTask(taskId: number) {
        this.router.navigate(['/taskForm'], { queryParams: { id: taskId } });
    }

}