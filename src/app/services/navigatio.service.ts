import { Injectable } from "@angular/core";
import { Router, RoutesRecognized } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { filter, pairwise } from 'rxjs';
import { Location } from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    previousUrl$ = new BehaviorSubject<string>("");

    constructor(
        private router: Router,
        private location : Location
    ) {

        this.router.events.pipe(
            filter((e): e is RoutesRecognized => {
                return e instanceof RoutesRecognized
            }),
            pairwise()
        ).subscribe(([prev, curr]) => {
            this.previousUrl$.next(prev.urlAfterRedirects);
            // console.log('Prev:', prev.urlAfterRedirects, 'Curr:', curr.urlAfterRedirects);
        })
    }

    goBackToPreviosUrl() {
        // const prev = this.previousUrl$.value;
        // if (prev) {
        //     this.router.navigateByUrl(prev);
        // }
        // else{
        //     this.router.navigate(['/dashboard'])
        // }

        this.location.back()
    }

}   