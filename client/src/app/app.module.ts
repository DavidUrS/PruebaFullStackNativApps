import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoursesComponent } from './colegio/courses/courses.component';
import { TeachersComponent } from './colegio/teachers/teachers.component';
import { StudentsComponent } from './colegio/students/students.component';
import { UsersComponent } from './colegio/users/users.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ColegioComponent } from './colegio/colegio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    TeachersComponent,
    StudentsComponent,
    UsersComponent,
    LoginComponent,
    ColegioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
