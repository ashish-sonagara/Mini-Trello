import { Injectable } from "@angular/core";
import { CommentInterface } from "../interface/comment.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    private commentList: CommentInterface[] = [];

    commentList$: BehaviorSubject<CommentInterface[]> = new BehaviorSubject<CommentInterface[]>(this.commentList);

    // addCommentsToSessionStorage(newComment : CommentInterface) {
    //     let commentList = [...this.commentList$.value , newComment];
    //     if (commentList) {
    //         sessionStorage.setItem('comments', JSON.stringify(commentList));
    //     }
    // }

    // getCommentFromSessionStorage() {
    //     let commentList = sessionStorage.getItem('comments')
    // }

}   