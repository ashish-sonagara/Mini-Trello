import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  userForm : FormGroup;

  constructor(private fb : FormBuilder , private userService : UserService, private http : HttpClient , private route : Router) { 
    this.userForm = this.fb.group({
      name : ["" , Validators.required],
      email : ["" , [Validators.required , Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" )]],
      password : ["" , [Validators.required,Validators.minLength(8)]],
      role : ["" , [Validators.required]]
    })
  }

  ngOnInit(): void {
    
  }

  formSubmitted() {
    if (this.userForm.valid){
      console.log(this.userForm.value)
    }
    const userdata = this.userForm.value; 

    // this.userService.addUserToSubject(userdata);
    
    this.userService.storeDataTosessionStorage(userdata);
    this.route.navigate(['signIn']);
  }
}
