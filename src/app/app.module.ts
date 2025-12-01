import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardComponent } from './dashboard/board/board.component';
import { TaskComponent } from './dashboard/task/task.component';
import { StatsComponent } from './dashboard/stats/stats.component';
import { ProjectsComponent } from './projects/projects.component';
import { TaskFormComponent } from './task-form/task-form.component'
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TemplateComponent } from './template/template.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SignInComponent,
    HomeComponent,
    HeaderComponent,
    DashboardComponent,
    BoardComponent,
    TaskComponent,
    StatsComponent,
    ProjectsComponent,
    TaskFormComponent,
    FooterComponent,
    ProfileComponent,
    KanbanBoardComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    DragDropModule
  ],
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
