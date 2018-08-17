import { Component, OnInit } from '@angular/core';
import { CoursesService } from './../../services/courses.service';
import { StudentsService } from './../../services/students.service';
import { Students } from './../../models/students';


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

  saveStudents(){
    const newStudent: Students={
      identificacion: this.modelStudents.identificacion,
      nombres: this.modelStudents.nombres,
      apellidos: this.modelStudents.apellidos,
      genero: this.modelStudents.genero,
      curso: this.modelStudents.curso
    }
    this.studentService.postStudent(newStudent).subscribe(res=>{
      this.getStudents();
      console.log(res);
    })
    this.modelStudents.identificacion='';
    this.modelStudents.nombres='';
    this.modelStudents.apellidos='';
    this.modelStudents.genero='';
    this.modelStudents.curso='';
  }

  deleteStudent(id){
    this.studentService.deleteStudent(id).subscribe(res=>{
      this.getStudents();
      console.log(res);
    })
  }

  


}
