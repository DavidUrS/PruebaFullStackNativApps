import { Component, OnInit } from '@angular/core';
import { CoursesService } from './../../services/courses.service';
import { StudentsService } from './../../services/students.service';
import { Students } from './../../models/students';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  modelStudents = new Students();

  constructor(private courseService : CoursesService, private studentService: StudentsService) { }

  ngOnInit() {
    this.getCourses();
    this.getStudents();
  }

  getStudents(){
    return this.studentService.getStudents().subscribe(data=>{
      this.studentService.students = data;
    })
  }

  getCourses(){
    this.courseService.getCourses().subscribe(data=>{
      this.courseService.courses = data;
    })
  }

  saveStudents(form?:NgForm){
    this.studentService.postStudent(form.value).subscribe(res=>{
      this.getStudents();
      this.cleanForm(form)
;      console.log(res);
    })

  }

  deleteStudent(id){
    this.studentService.deleteStudent(id).subscribe(res=>{
      this.getStudents();
      console.log(res);
    })
  }

  cleanForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.studentService.selectedStudent = new Students();
    }
  }

  


}
