import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './services/user.service';
import { ProjectsComponent } from './projects/projects.component';
import { TaskFormComponent } from './task-form/task-form.component';

const routes: Routes = [
  {path : 'signUp' , component : SignupComponent},
  {path : 'signIn' , component : SignInComponent},
  {path : 'home' , component : HomeComponent},
  {path : 'project' , component : ProjectsComponent},
  {path : 'taskForm' , component : TaskFormComponent},
  {path : 'dashboard' , component : DashboardComponent , canActivate : [authGuard]},
  {path : '**' , redirectTo : '/home' , pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
