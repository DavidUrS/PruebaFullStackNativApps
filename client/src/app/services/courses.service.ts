import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Courses } from './../models/courses';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  selectedCourse: Courses;
  courses:Courses[];
  API_COURSES  =  'http://localhost:3000';

  constructor(private http: HttpClient) {
    this.selectedCourse = new Courses();
   }
  getCourses(){
    return  this.http.get<Courses[]>(`${this.API_COURSES}/courses`);
  }
  postCourses(course:Courses){
    return this.http.post(`${this.API_COURSES}/courses`,course);
  }
  deleteCourse(id:string){
    return this.http.delete(`${this.API_COURSES}/courses/${id}`);
  }
}
