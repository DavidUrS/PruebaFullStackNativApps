import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Students } from './../models/students';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  selectedStudent:Students
  students:Students[];
  API_STUDENTS  =  'http://localhost:3000';

  constructor(private http:HttpClient) {
    this.selectedStudent = new Students();
   }

  getStudents(){
    return this.http.get<Students[]>(`${this.API_STUDENTS}/students`)
  }

  postStudent(student:Students){
    return this.http.post(`${this.API_STUDENTS}/students`,student);
  }

  updateStudent(student:Students){
    return this.http.put(`${this.API_STUDENTS}/students/${student._id}`,student)
  }
  
  deleteStudent(id:string){
    return this.http.delete(`${this.API_STUDENTS}/students/${id}`);
  }
}
