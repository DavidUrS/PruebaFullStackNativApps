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
    if(form.value._id){
      this.studentService.updateStudent(form.value).subscribe(res=>{
                  
        this.getStudents();
        console.log(res);
      })
    }else{
      this.studentService.postStudent(form.value).subscribe(res=>{
        this.cleanForm(form) 
        this.getStudents();
        console.log(res);
      })
    }
  }

  deleteStudent(id){
    this.studentService.deleteStudent(id).subscribe(res=>{
      this.getStudents();
      this.cleanForm();
      console.log(res);
    })
  }

  editStudent(student){
    this.studentService.selectedStudent=student;
  }

  cleanForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.studentService.selectedStudent = new Students();
    }
  }

  
  

}
