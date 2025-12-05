import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../interface/user.interface';
import { HeaderService } from '../services/header.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    standalone: false
})
export class SignInComponent {

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private route: Router, private userService: UserService, private header: HeaderService) {
    this.userForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]],
      password: ["", [Validators.required]]
    })
  }

  formSubmitted() {
    if (this.userForm.valid) {
      console.log(this.userForm.value)
      if (this.checkCredentials(this.userForm.value)) {

        this.generateAndStoreToken(this.userForm.value);

        // now the user can logOut successfully
        this.route.navigate(['/dashboard']);
      }
      else {
        alert("Email Or Password Didn't matched ")
      }
    }
  }

  generateAndStoreToken(user: User) {
    const userdata = this.userService.getDataFromsessionStorage();

    //----------------this is using the subject --------------
    // let userdata : User[] = [];
    // this.userService.userDataSubject.subscribe(res => {
    //   userdata = res;
    // })
    // ------------- ends here -----------------

    if (userdata) {
      const loggedUser = userdata.find(u => {
        return u.email === user.email;
      })!       // ! - if i put this symbol it means i know there will always be an result and the var will never get the undfined or null.
      console.log("inside the genrate and store token method ", loggedUser);

      this.userService.storeTokenInsessionStorage(loggedUser);
    }
  }

  checkCredentials(user: User): boolean {
    const userdata = this.userService.getDataFromsessionStorage();

    // const userdata = this.userService.userDataSubject.value;

    console.log("inside the check credentails ", userdata)

    const answer: boolean = userdata?.some(
      u => u.email === user.email && u.password === user.password
    ) ?? false;

    return answer;
  }
}
