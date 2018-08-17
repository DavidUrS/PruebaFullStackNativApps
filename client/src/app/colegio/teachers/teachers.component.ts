import { Component, OnInit } from '@angular/core';
import { TeachersService } from './../../services/teachers.service';
import { CoursesService } from './../../services/courses.service';
import { Teachers } from './../../models/teachers';  


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  modelTeacher = new Teachers();

  constructor(private teacherService: TeachersService, private coursesService: CoursesService) { }

  ngOnInit() {
    this.getCourses();
    this.getTeachers();
  }

  getCourses(){
    this.coursesService.getCourses().subscribe(res=>{
      this.coursesService.courses = res;
    })
  }

  getTeachers(){
    this.teacherService.getTeachers().subscribe(res=>{
      console.log("si")
      this.teacherService.teachers = res;;
    })
  }

  saveTeachers(){
    const newTeacher: Teachers= {
      identidad: this.modelTeacher.identidad,
      nombres: this.modelTeacher.nombres,
      apellidos: this.modelTeacher.apellidos,
      genero: this.modelTeacher.genero,
      curso: this.modelTeacher.curso
    }
    this.teacherService.postTeacher(newTeacher).subscribe(res=>{
      this.getTeachers();
      console.log(res);
    })
    this.modelTeacher.identidad='';
    this.modelTeacher.nombres='';
    this.modelTeacher.apellidos='';
    this.modelTeacher.genero= '';
    this.modelTeacher.curso='';
  }

  deleteTeacher(id:string){
    this.teacherService.deleteTeacher(id).subscribe(res=>{
      this.getTeachers();
      console.log(res)
    })
  }

}
