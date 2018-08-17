import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './colegio/courses/courses.component';
import { StudentsComponent } from './colegio/students/students.component';
import { TeachersComponent } from './colegio/teachers/teachers.component';
import { UsersComponent } from './colegio/users/users.component';
import { LoginComponent } from './login/login.component';
import { ColegioComponent } from './colegio/colegio.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'colegio', component: ColegioComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
