import { CommentInterface } from "./comment.interface";

export interface Task {
    id :number;
    imageURL : string;
    title : string;
    description : string;
    status : Status ;
    assignedUserEmail : string;
    assignedProject : string;
    comments ?: CommentInterface[];
}

type Status = '' | 'completed' | 'overdue' | 'inProgress';

export interface TaskWithUI extends Task {
    flipped ?: boolean;
    noComment ?: boolean;
}