import { Component, OnInit } from '@angular/core';
import { TeachersService } from './../../services/teachers.service';
import { CoursesService } from './../../services/courses.service';
import { Teachers } from './../../models/teachers';  
import { NgForm } from '@angular/forms';


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

  saveTeachers(form?: NgForm){
    this.teacherService.postTeacher(form.value).subscribe(res=>{
      this.getTeachers();
      this.cleanForm(form);
      console.log(res);
    })
  }

  deleteTeacher(id:string){
    this.teacherService.deleteTeacher(id).subscribe(res=>{
      this.getTeachers();
      console.log(res)
    })
  }

  cleanForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.teacherService.selectedTeacher = new Teachers();
    }
  }

}
