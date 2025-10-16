import { CommentInterface } from "./comment.interface";

export interface Task {
    id: number;
    imageURL: string;
    title: string;
    description: string;
    status: Status;
    assignedUserEmail: string;
    assignedProject: string;
    comments?: CommentInterface[];
    flipped?: boolean;
    noComment?: boolean;
}

type Status = '' | 'completed' | 'overdue' | 'inProgress';