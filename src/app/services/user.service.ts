import { inject, Injectable } from "@angular/core";
import { AuthUser, User } from "../interface/user.interface";
import { BehaviorSubject } from "rxjs";
import { CanActivateFn, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userData: User[] = [];
    private user !: AuthUser | null;

    currentUser$: BehaviorSubject<AuthUser | null> = new BehaviorSubject<AuthUser | null>(this.user);
    userDataSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.userData);

    storeDataTosessionStorage(userData: User) {
        let userList: User[] = [...this.userDataSubject.value, userData];
        // console.log(userList);
        this.userDataSubject.next(userList);
        sessionStorage.setItem('userData', JSON.stringify(this.userDataSubject.value));
    }

    // addUserToSubject(user: User) {
    //     let userList: User[] = [...this.userDataSubject.value, userData];
    //     console.log(userList);
    //     this.userDataSubject.next(userList);
    // }

    getDataFromsessionStorage(): User[] | null {
        const userDataString = sessionStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            return userData;
        }
        return null;
    }

    generateToken(user: User): string {
        const payload = {
            name: user.name,
            email: user.email,
            role: user.role,
            exp: Date.now() + 60 * 60 * 1000   // expires in 1 hour 
        }

        const token = btoa(JSON.stringify(payload))    // btoa - converts string to base64
        return token;
    }

    storeTokenInsessionStorage(user: User) {
        const token = this.generateToken(user);
        sessionStorage.setItem('token', token)
    }

    getTokenFromSessionStorage(): AuthUser | null {
        const token = sessionStorage.getItem('token');
        if (!token) {
            return null;         // if the token is undefined then return Null.
        }

        const decode = atob(token);
        const payload = JSON.parse(decode)

        if (payload.exp && Date.now() > payload.exp) {
            sessionStorage.removeItem('token');
            return null;
        }

        return {
            name: payload.name,
            email: payload.email,
            role: payload.role
        } as AuthUser;
    }

    getCurrentlyLoggedInuser() {
        let user: AuthUser | null = this.getTokenFromSessionStorage();
        if (user) {
            this.currentUser$.next(user);
            console.log("logging the currently stored user value", this.currentUser$.value);
        }
    }

    deleteToken(){
        sessionStorage.removeItem('token');
    }
}   

export const authGuard: CanActivateFn = () => {      // this auth protect from our web as the user cannot directly    jump to dashboard page via the URL , he must need to login to enter the dashboard page .

    const router = inject(Router);
    const userService = inject(UserService);

    const user = userService.getTokenFromSessionStorage();
    if (!user) {
        router.navigate(['signIn']);
        return false;
    }
    return true;

}