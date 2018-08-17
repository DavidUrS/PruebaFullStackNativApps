import { Component, OnInit } from '@angular/core';
import { Courses } from './../../models/courses';
import { CoursesService } from './../../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  modelCourse = new Courses();
  constructor(private courseService : CoursesService) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses(){
    this.courseService.getCourses().subscribe(data=>{
      this.courseService.courses = data as Courses[]
    })
  }

  saveCourses(){
    const newCourse: Courses = {
      codigo: this.modelCourse.codigo,
      nombre: this.modelCourse.nombre,
      observaciones: this.modelCourse.observaciones
    }
    this.courseService.postCourses(newCourse).subscribe(res=>{
      this.getCourses();
      console.log(res)
    })
    this.modelCourse.codigo='';
    this.modelCourse.nombre='';
    this.modelCourse.observaciones='';
  }

  deleteCourse(id){
    this.courseService.deleteCourse(id).subscribe(res=>{
      this.getCourses();
      console.log(res)
    })
  }

}
