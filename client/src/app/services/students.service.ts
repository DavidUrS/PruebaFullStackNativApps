import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Students } from './../models/students';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  students:Students[];
  API_STUDENTS  =  'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getStudents(){
    return this.http.get<Students[]>(`${this.API_STUDENTS}/students`)
  }

  postStudent(student:Students){
    return this.http.post(`${this.API_STUDENTS}/students`,student);
  }
  
  deleteStudent(id:string){
    return this.http.delete(`${this.API_STUDENTS}/students/${id}`);
  }
}
